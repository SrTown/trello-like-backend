import { Request, Response } from "express";
import db from "../config/db";
import { queryModifier } from "../utils";
import { Op, Sequelize } from "sequelize";

export const apiGetData = async (req: Request, res: Response) => {
	const { tableName } = req.params;
	let offsetTables, limitTables, attributes = { exclude: ['password_hash'] }, includeQuery, orderBy, distinct;
	try {
		var model = db.model(tableName);
	} catch (error) {
		return res.status(500).json({ ok: false, message: `The table ${tableName} doesn't exist.` });
	}
	try {
		const modifier = queryModifier(req.query);
		if (modifier[0]) req.query = modifier[0];
		if (modifier[1]) offsetTables = modifier[1];
		if (modifier[2]) limitTables = modifier[2];
		if (modifier[3]) attributes = modifier[3];
		if (modifier[4]) includeQuery = modifier[4];
		if (modifier[5]) orderBy = modifier[5];
		if (modifier[6]) distinct = modifier[6];

		let record;
		if (!req.query._count) {
			record = await model.findAll({
				where: req.query,
				attributes: (distinct ? [Sequelize.fn('DISTINCT', Sequelize.col(distinct)), distinct] : attributes),
				offset: offsetTables,
				limit: limitTables,
				order: orderBy,

			});
			return res.status(201).json({ ok: true, count: record.length, data: record });
		} else {
			delete req.query._count;
			record = await model.count({
				where: req.query,
			});
			return res.status(201).json({ ok: true, count: record });
		}
	} catch (error: any) {
		return res.status(500).json({ ok: false, message: "Contact the developer." });
	}
};