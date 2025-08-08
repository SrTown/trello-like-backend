import db from "../config/db";
import { Request, Response } from "express";
import { users } from "../models";
import { cryptoEncrypt, encrypt } from "./encryptors.handler";
import { queryModifier } from "../utils";

export const createRecords = async (req: Request, res: Response) => {
    const { tableName } = req.params;
    let encriptar: string[];
    if (req.body.encrypt && req.body.encrypt.includes(',')) encriptar = req.body.encrypt.trim().split(',').map((item: string) => item.trim());
    try {
        try {
            var model = db.model(tableName);
        } catch (error) {
            return res.status(500).json({ ok: false, message: `The table ${tableName} doesn't exist.` });
        }
        if (!req.body.data) return res.status(500).json({ ok: false, message: `You need to send the data you want to add into an array 'data'.` });

        const promises = req.body.data.map(async (data: any, index: number) => {
            if (tableName == 'users') {
                const userExist = await users.findOne({
                    where: { email: data.email },
                    attributes: {
                        exclude: ['password_hash']
                    }
                });
                if (userExist) {
                    return res.status(409).json({ ok: false, message: `Element ${index + 1} - The user already exists. - ${data.email}` });
                }
                if (data.password_hash) data.password_hash = await encrypt(data.password_hash);
            }
            if (encriptar || req.body.encrypt) {
                Object.entries(data).forEach(([key, value]) => {
                    if (typeof value === 'string' && !value.startsWith('ENC:')) {
                        if ((encriptar && encriptar.includes(key)) || (!encriptar && req.body.encrypt == key)) data[key] = cryptoEncrypt(value);
                    }
                })
            }
        });
        await Promise.all(promises);
        const datos = await model.bulkCreate(req.body.data);
        return res.status(201).json({ ok: true, message: `Records created: ${datos.length}`, data: datos });
    } catch (error: any) {
        return res.status(500).json({ ok: false,/* message: error.errors[0].message*/message: error });
    }
}

export const updateRecords = async (req: Request, res: Response) => {
    let offsetTables, limitTables;
    const { tableName } = req.params;
    try {
        var model = db.model(tableName);
    } catch (error) {
        return res.status(500).json({ ok: false, message: `The table ${tableName} doesn't exist.` });
    }
    try {
        const modifier = queryModifier(req.query);
        req.query = modifier[0];
        offsetTables = modifier[1];
        limitTables = modifier[2];

        const records = await model.findAll({
            where: req.query,
            attributes: {
                exclude: ['password_hash']
            },
            offset: offsetTables,
            limit: limitTables
        });
        if (req.body.password_hash) req.body.password_hash = await encrypt(req.body.password_hash);
        if (!records || records.length == 0) return res.status(404).json({ ok: true, message: `No records found with the information provided.` });
        for (const record of records) {
            await record.update(req.body);
            record.save();
        }
        return res.status(200).json({ ok: true, message: `Records found and updated: ${records.length}`, data: records });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "DB error." });
    }
}
export const updateEncryptedRecords = async (req: Request, res: Response) => {
    Object.entries(req.body).forEach(([key, value]) => {
        if (typeof value === 'string' && !value.startsWith('ENC:')) {
            req.body[key] = cryptoEncrypt(value);
        }
    })
    updateRecords(req, res);
}
export const deleteRecords = async (req: Request, res: Response) => {
    let offsetTables, limitTables;
    const { tableName } = req.params;
    try {
        var model = db.model(tableName);
    } catch (error) {
        return res.status(500).json({ ok: false, message: `The table ${tableName} doesn't exist.` });
    }
    try {
        const modifier = queryModifier(req.query);
        req.query = modifier[0];
        offsetTables = modifier[1];
        limitTables = modifier[2];

        const records = await model.findAll({
            where: req.query,
            attributes: {
                exclude: ['password_hash']
            },
            offset: offsetTables,
            limit: limitTables
        });
        let count = 0;
        for (const record of records) {
            if (record.dataValues.status == true) count++;
            await record.update({ status: false });
            record.save();
        }
        if (count == 0 || records.length == 0) return res.status(404).json({ ok: false, message: `No records found or the records were already deleted previously.` });
        return res.status(200).json({ ok: true, message: `Records found and deleted: ${count}`, data: records });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "DB error." });
    }
}

export const removeRecords = async (req: Request, res: Response) => {
    let offsetTables, limitTables;
    const { tableName } = req.params;
    try {
        var model = db.model(tableName);
    } catch (error) {
        return res.status(500).json({ ok: false, message: `The table ${tableName} doesn't exist.` });
    }
    try {
        const modifier = queryModifier(req.query);
        req.query = modifier[0];
        offsetTables = modifier[1];
        limitTables = modifier[2];

        const records = await model.findAll({
            where: req.query,
            attributes: {
                exclude: ['password_hash']
            },
            offset: offsetTables,
            limit: limitTables
        });
        if (!records || records.length == 0) return res.status(404).json({ ok: true, message: `No records found with the information provided.` });
        for (const record of records) {
            await record.destroy();
        }
        return res.status(200).json({ ok: true, message: `Records found and removed: ${records.length}`, data: records });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "DB error." });
    }
}