import { DataTypes } from "sequelize"
import db from "../config/db"

export const task_comments = db.define("task_comments", {
  id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4,
  },
  task_id: {
    type: DataTypes.UUID, allowNull: false,
  },
  author_id: {
    type: DataTypes.UUID,
  },
  body: {
    type: DataTypes.TEXT, allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE, defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "task_comments",
  underscored: true,
  timestamps: false,
})
