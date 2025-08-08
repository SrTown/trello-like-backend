import { DataTypes } from "sequelize"
import db from "../config/db"

export const project_memberships = db.define("project_memberships", {
  project_id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true,
  },
  role_id: {
    type: DataTypes.UUID, allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE, defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "project_memberships",
  underscored: true,
  timestamps: false,
})
