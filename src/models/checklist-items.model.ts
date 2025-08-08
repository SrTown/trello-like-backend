import { DataTypes } from "sequelize"
import db from "../config/db"

export const checklist_items = db.define("checklist_items", {
  id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4,
  },
  checklist_id: {
    type: DataTypes.UUID, allowNull: false,
  },
  content: {
    type: DataTypes.STRING, allowNull: false,
  },
  is_done: {
    type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false,
  },
  position: {
    type: DataTypes.INTEGER, allowNull: false, defaultValue: 0,
  },
  done_at: {
    type: DataTypes.DATE,
  },
  created_at: {
    type: DataTypes.DATE, defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "checklist_items",
  underscored: true,
  timestamps: false,
})
