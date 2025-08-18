import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"
import UserModel from "./userModel.js"

const DomainModel = sequelize.define(
  "Domain",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: UserModel,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
)

DomainModel.belongsTo(UserModel, { foreignKey: "userId" })

export default DomainModel
