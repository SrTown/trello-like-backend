declare namespace Express {
    export interface Request {
        id_user: string;
        type_user: string;
        userLanguage: string;
        code_cua_user: string;
        code_cua_master: string;
    }
}