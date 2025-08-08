import { Router } from "express";
import { getUsers, getProfile, updatePassword } from "../handlers";
import { errors, validateUpdatePassword } from "../middlewares";

export const routerUsers: Router = Router()

routerUsers.get('/', getUsers);
routerUsers.get('/profile', getProfile);
routerUsers.post('/updatePassword', validateUpdatePassword, errors, updatePassword);