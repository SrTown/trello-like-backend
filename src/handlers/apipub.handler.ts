import { Request, Response } from "express";
import db from "../config/db";
import { queryModifier } from "../utils";

export const apiPubData = async (req: Request, res: Response) => {
    const { tableName } = req.params;
    let includeTables, offsetTables, limitTables, attributes;
    attributes = attributes = { exclude: ['password_hash'] };
    try {
        var model = db.model(tableName);
    } catch (error) {
        return res.status(500).json({ ok: false, message: `The table ${tableName} doesn't exist.` });
    }
    try {
        if (tableName == 'tasks') {

            const modifier = queryModifier(req.query);
            req.query = modifier[0];
            offsetTables = modifier[1];
            limitTables = modifier[2];
            if (modifier[3]) attributes = modifier[3];

            let record;
            if (!req.query._count) {
                record = await model.findAll({
                    where: req.query,
                    include: includeTables,
                    attributes,
                    offset: offsetTables,
                    limit: limitTables,
                });
                return res.status(201).json({ ok: true, count: record.length, data: record });
            } else {
                delete req.query._count;
                record = await model.count({
                    where: req.query,
                });
                return res.status(201).json({ ok: true, count: record });
            }
        } else {
            return res.status(403).json({ ok: false, message: "Forbidden table." });
        }
    } catch (error: any) {
        return res.status(500).json({ ok: false, message: "Contact the developer." });
    }
};