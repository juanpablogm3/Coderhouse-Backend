import cookie from 'cookie';
import UserDTO from '../dao/DTO/userDTO.js';



class AuthController {
    async getSession(req, res) {
        try {
            return res.send(JSON.stringify(req.session))
        } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async getCurrentSessionUser(req, res) {
        try {
            const user = new UserDTO(req.session.user)
            return res.send(JSON.stringify(user.filter()));
        } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'OOps... something went wrong :(',
            data: {},
        });
        }
    }

    async getRegisterPage(req, res) {
        try {
            return res.render('register', {});
        } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async registerUser(req, res) {
        try {
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
        } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async failRegister(req, res) {
        try {
            return res.json({ error: 'fail to register' });
        } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async getLoginPage(req, res) {
        try {
            return res.render('login', {});
        } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async loginUser(req, res) {
        try {
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
            const cartId = req.session.user.cartId;
            console.log({ msg: 'ok', payload: req.user });
            res.setHeader('Set-Cookie', cookie.serialize('cartId', cartId));
            return res.redirect('/products')
        } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async failLogin(req, res) {
        try {
            return res.json({ error: 'fail to login' });
        } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async logoutUser(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                return res.status(500).render('error', { error: 'no se pudo cerrar su session' });
                }
                return res.redirect('/auth/login');
            });
        } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async getUserProfile(req, res) {
        try {
            const user = req.session.user;
            return res.render('perfil', { user });
        } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async getAdminPage(req, res) {
        try {
            const user = req.session.user;
            res.render('admin',{user});
        } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async githubCallback(req, res) {
        try {
            if (!req.user) {
                return res.json({ error: 'Invalid credentials' });
            }
        
            req.session.user = {
                _id: req.user._id,
                email: null,
                first_name: req.user.first_name,
                last_name: null,
                age: null,
                role: 'user',
                cartId: req.user.cartId
            };
            return res.redirect('/auth/githubcallbackResp');

        } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async githubCallbackResp(req, res) {
        try {
            return res.render('githubcallbackResp',{});
        } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }
}

export const authController = new AuthController();