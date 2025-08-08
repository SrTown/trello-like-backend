import { Router } from "express";
import { logout, login, signup, forgotPassword } from "../handlers";
import { createUserValidator, errors, validateForgotPassword } from "../middlewares";
import { body } from "express-validator";


export const routerAuthentication: Router = Router();


routerAuthentication.post('/login',
    body('email').notEmpty().withMessage('The email is mandatory.'),
    body('password_hash').notEmpty().withMessage('The passowrd is mandatory.'),
    errors,
    login);

routerAuthentication.post('/signup', createUserValidator, errors, signup);

routerAuthentication.post('/logout', logout);
routerAuthentication.post('/forgotPassword', validateForgotPassword, errors, forgotPassword);

