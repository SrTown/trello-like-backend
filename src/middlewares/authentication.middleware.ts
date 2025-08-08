import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
    id: string;
    typeUser: string;
    userLanguage: string;
    code_cua_user: string;
    code_cua_master: string;
    iat: number;
    exp: number;
}

export const validateCookie = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.cookies.access_token;
    //if (!token) return res.status(403).json({ message: 'Acceso denegato. No cookie.' });
    try {
        const payload = jwt.verify(
            token,
            process.env.TOKEN_KEYWORD || "tokentest",
        ) as IPayload;
        req.id_user = payload.id;
        req.type_user = payload.typeUser;
        req.userLanguage = payload.userLanguage;
        req.code_cua_user = payload.code_cua_user;
        req.code_cua_master = payload.code_cua_master;
    } catch (error) {
        //return res.status(403).json({ message: 'Acceso denegato. No jwt.' });
    }
    next();
};

export const getBearerToken = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(403).json({
            ok: false,
            token_expired: false,
            message: "Access denied. Bearer token missing.",
        });
    }

    const parts = authorizationHeader.split(" ");
    if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
        return res.status(403).json({
            ok: false,
            token_expired: false,
            message: "Access denied. Bearer token missing.",
        });
    }
    try {
        jwt.verify(parts[1], process.env.TOKEN_KEYWORD || "tokentest");
    } catch (error) {
        return res.status(403).json({
            ok: false,
            token_expired: true,
            message: "Access denied. The bearer token is invalid.",
        });
    }
    next();
};

export const validateRoutePrivate = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.headers.authorization?.split(" ")[1] ||
        req.cookies.access_token;

    res.cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    });
    
    try {
        if (typeof token === "string") {
            const decrypt = jwt.verify(token, process.env.TOKEN_KEYWORD || "tokentest") as IPayload;
            req.id_user = decrypt?.id;
            req.type_user = decrypt.typeUser;
            req.userLanguage = decrypt.userLanguage;
            req.code_cua_user = decrypt.code_cua_user;
            req.code_cua_master = decrypt.code_cua_master;
        } else {
            return res.status(401).json({
                ok: false,
                token_expired: true,
                message: "Access denied. Invalid token format.",
            });
        }
        if (!req.id_user) {
            return res.status(401).json({
                ok: false,
                token_expired: true,
                message: "Access denied. Session token expired.",
                token,
            });
        }
    } catch (error) {
        if (!token) {
            return res.status(401).json({
                ok: false,
                token_expired: true,
                message: `Prueba Expo localhost:8081. Token = ${token}`,
            });
        }
    }
    if (!token) {
        return res.status(403).json({
            ok: false,
            token_expired: false,
            message: `Access denied. Please sign in.`,
        });
    }
    next();
};

export const validateRoutePublic = async (req: Request, res: Response) => {
    if (req.id_user) {
        return res.status(403).json({
            of: false,
            message: "No need to sign in.",
        });
    }
    //res.redirect('/postlogueo');
    return res.json({ message: "Sign in." });
};

export const validateCuaMaster = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = req.header("auth-token");
        if (!token) return res.status(401).json("Access denied.");
        const payload = jwt.verify(token, "muercielagoeatcloud") as IPayload;
        if (payload.typeUser != "cua_master") {
            return res.status(401).json({
                ok: false,
                message: `Access denied, you're not a cua master.`,
            });
        }
        req.id_user = payload.id;
        req.type_user = payload.typeUser;
        next();
    } catch (error) {
        return res.status(401).json("Error, token expired.");
    }
};
