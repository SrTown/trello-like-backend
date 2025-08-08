import { Router } from "express";
import { apiPubData } from "../handlers";

export const routerApipub: Router = Router()

routerApipub.get('/:tableName', apiPubData);

