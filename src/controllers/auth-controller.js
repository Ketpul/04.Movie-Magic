import { Router } from "express";
import authService from "../services/auth-service.js";
import { getErrorMessage } from "../utils/error-utils.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        await authService.register(userData);
    } catch (error) {
        console.log(getErrorMessage(error));

        return res.redirect('/auth/register');
    }

    res.redirect('/auth/login');
});


authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie('auth', token, {httpOnly: true})
        res.redirect('/');

    } catch (error) {
        console.log(error.message);
        res.redirect('/404');
    }

});

authController.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
});

export default authController;