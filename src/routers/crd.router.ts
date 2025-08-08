import { Router } from "express";
import { errors, tableNameValidatorCreate } from "../middlewares";
import { createRecords, removeRecords, updateRecords } from "../handlers";

export const routerCrd: Router = Router()

routerCrd.post('/create/:tableName', tableNameValidatorCreate, createRecords);
routerCrd.post('/update/:tableName', errors, updateRecords);
routerCrd.post('/remove/:tableName', errors, removeRecords); //Removes record completely
