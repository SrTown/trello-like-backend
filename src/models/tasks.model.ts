import { DataTypes } from "sequelize"
import db from "../config/db"

export const tasks = db.define("tasks", {
  id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4,
  },
  project_id: {
    type: DataTypes.UUID, allowNull: false,
  },
  column_id: {
    type: DataTypes.UUID, allowNull: false,
  },
  title: {
    type: DataTypes.STRING, allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  due_date: {
    type: DataTypes.DATE,
  },
  position: {
    type: DataTypes.INTEGER, allowNull: false, defaultValue: 0,
  },
  created_by: {
    type: DataTypes.UUID,
  },
  archived_at: {
    type: DataTypes.DATE,
  },
  created_at: {
    type: DataTypes.DATE, defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE, defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "tasks",
  underscored: true,
  timestamps: false,
})
