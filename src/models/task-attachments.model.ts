import { DataTypes } from "sequelize"
import db from "../config/db"

export const task_attachments = db.define("task_attachments", {
  id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4,
  },
  task_id: {
    type: DataTypes.UUID, allowNull: false,
  },
  uploader_id: {
    type: DataTypes.UUID,
  },
  url: {
    type: DataTypes.TEXT, allowNull: false,
  },
  file_name: {
    type: DataTypes.STRING,
  },
  file_size_bytes: {
    type: DataTypes.BIGINT,
  },
  mime_type: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE, defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "task_attachments",
  underscored: true,
  timestamps: false,
})
