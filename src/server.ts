import express, { Application } from "express";
import cookieParser from "cookie-parser";
//import { routerApi, routerApipub, routerAuthentication, routerCrd, routerUsers } from "./routers";
import db from "./config/db";
import cors from 'cors';
import { getBearerToken, validateCookie, validateRoutePrivate } from "./middlewares";

async function db_connection() {
    try {
        await db.authenticate();
        db.sync();
        console.log('Conexión exitosa a la db');
    } catch (error) {
        console.log({ ok: false, message: "Unable to connect db", error: error });
    }
}

db_connection();

const server: Application = express();

const corsOptions = {
    origin: true,
    credentials: true,
}

server.use(cors(corsOptions))
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(validateCookie);

// server.use("/user", validateRoutePrivate, getBearerToken, routerUsers);
// server.use("/auth", routerAuthentication);
// server.use("/api", validateRoutePrivate, getBearerToken, routerApi);
// server.use("/apipub", routerApipub);
// server.use("/crd", validateRoutePrivate, getBearerToken, routerCrd);

export default server;