import { DataTypes } from "sequelize"
import db from "../config/db"

export const project_invites = db.define("project_invites", {
  id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4,
  },
  project_id: {
    type: DataTypes.UUID, allowNull: false,
  },
  email: {
    type: DataTypes.STRING, allowNull: false,
  },
  role_id: {
    type: DataTypes.UUID, allowNull: false,
  },
  token: {
    type: DataTypes.STRING, allowNull: false, unique: true,
  },
  expires_at: {
    type: DataTypes.DATE, allowNull: false,
  },
  accepted_at: {
    type: DataTypes.DATE,
  },
  created_by: {
    type: DataTypes.UUID,
  },
  created_at: {
    type: DataTypes.DATE, defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "project_invites",
  underscored: true,
  timestamps: false,
})
