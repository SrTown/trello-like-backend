import { DataTypes } from "sequelize"
import db from "../config/db"

export const board_columns = db.define("board_columns", {
  id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4,
  },
  project_id: {
    type: DataTypes.UUID, allowNull: false,
  },
  name: {
    type: DataTypes.STRING, allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER, allowNull: false, defaultValue: 0,
  },
  is_default: {
    type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false,
  },
  created_at: {
    type: DataTypes.DATE, defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "board_columns",
  underscored: true,
  timestamps: false,
  indexes: [
    { unique: true, fields: ["project_id", "name"], name: "board_columns_project_name_unique" },
  ],
})
