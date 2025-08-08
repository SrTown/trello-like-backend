import { DataTypes } from "sequelize"
import db from "../config/db"

export const checklists = db.define("checklists", {
  id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4,
  },
  task_id: {
    type: DataTypes.UUID, allowNull: false,
  },
  title: {
    type: DataTypes.STRING, allowNull: false, defaultValue: "Checklist",
  },
  position: {
    type: DataTypes.INTEGER, allowNull: false, defaultValue: 0,
  },
  created_at: {
    type: DataTypes.DATE, defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "checklists",
  underscored: true,
  timestamps: false,
})
