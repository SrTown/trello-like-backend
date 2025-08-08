import dotenv from "dotenv";
dotenv.config();
import '../src/models/associations';
import { Request, Response } from "express";
import server from "../src/server";

server.get("/", (req: Request, res: Response) => {
    res.send({
        ok: true,
        message: "Server is running",
        date: new Date().toLocaleString("en-US", { timeZone: 'America/Chicago' })
        
    })
});

server.listen(process.env.PORT_BACKEND, () => {
    console.log('Running server on port', process.env.PORT_BACKEND || 3000);
});