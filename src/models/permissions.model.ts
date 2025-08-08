import { DataTypes } from "sequelize"
import db from "../config/db"

export const permissions = db.define("permissions", {
  id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4,
  },
  key: {
    type: DataTypes.STRING, allowNull: false, unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: "permissions",
  underscored: true,
  timestamps: false,
})
