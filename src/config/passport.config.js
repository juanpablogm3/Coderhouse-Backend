import passport from 'passport';
import local from 'passport-local';
import GithubStrategy from 'passport-github2';
import { createHash, isValidPassword } from '../utils.js';
import { UserModel } from '../dao/mongoose/users.model.js'
import { cartService } from '../services/carts.service.js';
import 'dotenv/config';
import { logger } from '../logger.js';

const LocalStrategy = local.Strategy;

export function iniPassport() {
  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (username, password, done, req) => {
      try {
        const user = await UserModel.findOne({ email: username });
        if (!user) {
          logger.error('User Not Found with username (email) ' + username);
          return done(null, false);
        }
        if (!isValidPassword(password, user.password)) {
          logger.warn('Invalid Password');
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        try {
          const { email, first_name, last_name, age } = req.body;
          const cart = await cartService.createCart();
          const cartId = cart._id;
          let user = await UserModel.findOne({ email: username });
          if (user) {
            logger.warning('User already exists');
            return done(null, false);
          }

          const newUser = {
            email,
            first_name,
            last_name,
            age,
            role: 'user',
            password: createHash(password),
            cartId: cartId
          };
          let userCreated = await UserModel.create(newUser);
          logger.info(userCreated);
          logger.info('User Registration succesful');
          return done(null, userCreated);
        } catch (e) {
          logger.error('Error in register');
          logger.error(e);
          return done(e);
        }
      }
    )
  );

  passport.use(
    'github',
    new GithubStrategy(
      {
        clientID: `${process.env.clientID}`,
        clientSecret: `${process.env.clientSecret}`,
        callbackURL: `${process.env.callbackURL}`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Verificar si el usuario ya existe en la base de datos
          const existingUser = await UserModel.findOne({ 'email': profile.id });

          if (existingUser) {
            return done(null, existingUser);
          }
          const cart = await cartService.createCart();
          const cartId = cart._id;

          // Crear un nuevo usuario con los datos de GitHub
          const newUser = new UserModel({
            'email': profile.id,
            'age': 21,
            'first_name': profile.displayName,
            'last_name': profile.displayName,         
            'role': 'user',
            'password': null,
            'cartId': cartId
          });

          const userCreated = await newUser.save();
          return done(null, userCreated);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  });
}