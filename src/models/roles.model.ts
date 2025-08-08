import { DataTypes } from "sequelize"
import db from "../config/db"

export const roles = db.define("roles", {
  id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4,
  },
  slug: {
    type: DataTypes.STRING, allowNull: false, unique: true,
  },
  name: {
    type: DataTypes.STRING, allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  scope: {
    type: DataTypes.STRING, allowNull: false, defaultValue: "project",
  },
  created_at: {
    type: DataTypes.DATE, defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "roles",
  underscored: true,
  timestamps: false,
})
