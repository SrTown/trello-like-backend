import { DataTypes } from "sequelize"
import db from "../config/db"

export const role_permissions = db.define("role_permissions", {
  role_id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true,
  },
  permission_id: {
    type: DataTypes.UUID, allowNull: false, primaryKey: true,
  },
}, {
  tableName: "role_permissions",
  underscored: true,
  timestamps: false,
})
