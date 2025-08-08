import { DataTypes } from "sequelize"
import db from "../config/db"

export const activity_log = db.define("activity_log", {
  id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4,
  },
  project_id: {
    type: DataTypes.UUID, allowNull: false,
  },
  actor_id: {
    type: DataTypes.UUID,
  },
  action: {
    type: DataTypes.STRING, allowNull: false,
  },
  entity_type: {
    type: DataTypes.STRING, allowNull: false,
  },
  entity_id: {
    type: DataTypes.UUID,
  },
  metadata: {
    type: DataTypes.JSON,
  },
  created_at: {
    type: DataTypes.DATE, defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "activity_log",
  underscored: true,
  timestamps: false,
})
