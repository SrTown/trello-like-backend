import { DataTypes } from "sequelize"
import db from "../config/db"

export const projects = db.define("projects", {
  id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING, allowNull: false,
  },
  owner_id: {
    type: DataTypes.UUID,
  },
  archived_at: {
    type: DataTypes.DATE,
  },
  created_at: {
    type: DataTypes.DATE, defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "projects",
  underscored: true,
  timestamps: false,
})
