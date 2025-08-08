import bcrypt from "bcryptjs";
import * as crypto from 'crypto';

export const encrypt = async (pass: string) => {
    const salt = await bcrypt.genSalt(10);
    const encrypted = await bcrypt.hash(pass, salt)
    return encrypted
}

export const compare = async (pass: string, encrypted: string) => {
    return await bcrypt.compare(pass, encrypted)
}

export const cryptoEncrypt = (text: string) => {
    const algorithm = 'aes-256-cbc';
    const key = process.env.CRYPTO_KEY ? Buffer.from(process.env.CRYPTO_KEY, 'hex') : crypto.randomBytes(32);
    const iv = process.env.CRYPTO_IV ? Buffer.from(process.env.CRYPTO_IV, 'hex') : crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `ENC:${iv.toString('hex')}:${encrypted}`;
}

export const cryptoDecrypt = (data: string) => {
    const algorithm = 'aes-256-cbc';
    const key = process.env.CRYPTO_KEY ? Buffer.from(process.env.CRYPTO_KEY, 'hex') : crypto.randomBytes(32);
    const parts = data.split(':');
    const iv = Buffer.from(parts[1], 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(parts[2], 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}