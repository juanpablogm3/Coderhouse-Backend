import express from 'express';
import passport from 'passport';
import { isAdmin, isUser } from '../middlewares/auth.js';

export const authRouter = express.Router();

authRouter.get('/session', (req, res) => {
  return res.send(JSON.stringify(req.session));
});

authRouter.get('/register', (req, res) => {
  return res.render('register', {});
});

authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), (req, res) => {
    if (!req.user) {
        return res.json({ error: 'something went wrong' });
    }
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      role: req.user.role,
      cartId: req.user.cartId
    };
    console.log({ msg: 'ok', payload: req.user });
    return res.redirect('/auth/login')
});

authRouter.get('/failregister', async (req, res) => {
  return res.json({ error: 'fail to register' });
});

authRouter.get('/login', (req, res) => {
  return res.render('login', {});
});

authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), async (req, res) => {
  if (!req.user) {
    return res.json({ error: 'invalid credentials' });
  }
  req.session.user = {
    _id: req.user._id,
    email: req.user.email,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    role: req.user.role,
    cartId: req.user.cartId
  };
  console.log({ msg: 'ok', payload: req.user });
  return res.redirect('/products')
});

authRouter.get('/faillogin', async (req, res) => {
  return res.json({ error: 'fail to login' });
});

authRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).render('error', { error: 'no se pudo cerrar su session' });
    }
    return res.redirect('/auth/login');
  });
});

authRouter.get('/perfil', isUser, (req, res) => {
  const user = req.session.user;
  return res.render('perfil', { user });
});

authRouter.get('/administracion', isAdmin, (req, res) => {
    const user = req.session.user;
    res.render('admin',{user});
});

authRouter.get('/github', passport.authenticate('github'));

authRouter.get(
  '/githubcallback',
  passport.authenticate('github', { failureRedirect: '/auth/faillogin' }),
  async (req, res) => {
    if (!req.user) {
      return res.json({ error: 'Invalid credentials' });
    }

    req.session.user = {
      _id: req.user._id,
      email: null,
      first_name: null,
      last_name: null,
      age: null,
      role: 'user',
      cartId: req.user.cartId
    };

    return res.redirect('/auth/githubcallback');
  }
);