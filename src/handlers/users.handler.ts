import { Request, Response } from "express";
import { users as Users } from "../models"

export const getUsers = async (req: Request, res: Response) => {
    const users = await Users.findAll({
        attributes: {
            exclude: [
                'createdAt', 'password_hash'
            ]
        }
    });
    res.json({ ok: true, data: users });
}

export const createUser = async (req: Request, res: Response) => {
    const users = await Users.create(req.body);
    res.json({ ok: true, message: "User created succesfully." })
}

export const getProfile = async (req: Request, res: Response) => {
    const users = await Users.findOne({
        where: { id: req.id_user },
        attributes: {
            exclude: [
                'createdAt', 'password_hash'
            ]
        }
    });
    res.json({ ok: true, data: users });
}