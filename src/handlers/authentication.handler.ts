import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { users as Users } from "../models"
import { compare, encrypt } from "./encryptors.handler";

export const login = async (req: Request, res: Response) => {
    var { email, password_hash } = req.body;
    try {
        const users = await Users.findOne({
            where: { email },
            attributes: {
                exclude: [
                    'createdAt', 'updatedAt'
                ]
            }
        });
        if (!users) {
            return res.status(200).json({ ok: false, message: 'Invalid credentials' });
        }
        const samePaswword = await compare(password_hash, users.dataValues.password_hash)
        if (!samePaswword) {
            return res.status(200).json({ ok: false, message: 'Invalid credentials' });
        }
        //Creacion de Token
        const token: string = jwt.sign({
            id: users.dataValues.id,
        }, process.env.TOKEN_KEYWORD || "tokentest", {
            expiresIn: '24h'
        });
        res.cookie("access_token", token).json({
            ok: true,
            message: "User logged succesfully.",
            "token": token,
        })
    } catch (error) {
        return res.status(401).json({ ok: false, message: "Unable to sign in. DB error.", error });
    }

}

export const signup = async (req: Request, res: Response) => {
    try {
        const userExist = await Users.findOne({
            where: { email: req.body.email },
            attributes: {
                exclude: ['password_hash']
            }
        });
        if (userExist) return res.status(409).json({ ok: false, message: "The user already exists." });
        //Encriptacion de contraseña
        req.body.password_hash = await encrypt(req.body.password_hash);
        await Users.create(req.body);
        res.json({ ok: true, message: "User registered succesfully.", });
    } catch (error) {
        return res.status(409).json({ ok: false, message: "Unable to register new user. DB error.", error });
    }
}

export const logout = async (req: Request, res: Response) => {
    return res.clearCookie('access_token').json({
        ok: true,
        message: 'Session closed succesfully.'
    });
}

export const updatePassword = async (req: Request, res: Response) => {
    var { email, password_hash, newPassword } = req.body;
    if (password_hash == newPassword) return res.json({ ok: false, message: "Old and new password are the same." });
    const users = await Users.findOne({
        where: { email },
        attributes: {
            exclude: [
                'createdAt', 'updatedAt'
            ]
        }
    });
    if (!users) {
        return res.status(404).json({ ok: false, message: `Unable to get user information.` });
    }
    const samePaswword = await compare(password_hash, users.dataValues.password_hash)
    if (!samePaswword) {
        return res.status(401).json({ ok: false, message: 'Wrong password.' });
    }
    password_hash = await encrypt(newPassword);
    await users.update({ password_hash });
    await users.save();
    res.json({ ok: true, message: "Password updated succesfully." });
}

export const forgotPassword = async (req: Request, res: Response) => {
    var { email, newPassword } = req.body;
    const users = await Users.findOne({
        where: { email },
        attributes: {
            exclude: [
                'createdAt'
            ]
        }
    });
    if (!users) {
        return res.status(404).json({ ok: false, message: `There isn't a user with that email address.` });
    }
    const password_hash = await encrypt(newPassword);
    await users.update({ password_hash });
    await users.save();
    res.json({ ok: true, message: "Password updated succesfully." });
}