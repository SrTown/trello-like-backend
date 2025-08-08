import { DataTypes } from "sequelize"
import db from "../config/db"

export const labels = db.define("labels", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  project_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "labels",
  underscored: true,
  timestamps: false,
  indexes: [
    { unique: true, fields: ["project_id", "name"], name: "labels_project_name_unique" },
  ],
})
