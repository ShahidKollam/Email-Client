import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const UserModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  mobileNumber: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  otp: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  otpExpiry: {
    type: DataTypes.DATE,
    defaultValue: () => new Date(Date.now() + 30 * 1000),
    allowNull: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  entityId: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  entityName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
})

export default UserModel
