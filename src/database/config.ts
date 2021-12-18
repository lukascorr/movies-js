import {Sequelize} from "sequelize";

export const db = new Sequelize(
    String(process.env.DB_NAME),
    String(process.env.DB_USER),
    String(process.env.DB_PASSWORD),
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
)
