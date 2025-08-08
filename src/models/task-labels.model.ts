import { DataTypes } from "sequelize"
import db from "../config/db"

export const task_labels = db.define("task_labels", {
  task_id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true,
  },
  label_id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true,
  },
}, {
  tableName: "task_labels",
  underscored: true,
  timestamps: false,
})
