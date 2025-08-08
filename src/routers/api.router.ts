import { Router } from "express";
import { apiGetData } from "../handlers";

export const routerApi: Router = Router()

routerApi.get('/:tableName', apiGetData);

