import {DataTypes, Model} from "sequelize";
import { db } from "../database/config";

const sequelize = db
export class Movie extends Model{}

Movie.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    sequelize,
    tableName: 'movies'
})
