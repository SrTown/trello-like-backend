import { DataTypes } from "sequelize"
import db from "../config/db"

export const task_assignees = db.define("task_assignees", {
  task_id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true,
  },
}, {
  tableName: "task_assignees",
  underscored: true,
  timestamps: false,
})
