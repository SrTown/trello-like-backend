import { Sequelize } from "sequelize-typescript";

const db = new Sequelize({
    dialect: "mysql",
    dialectModule: require('mysql2'),
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    models: ['../models/**/*.ts'],
    dialectOptions: {
        port: "3306"
    },
});

export default db;