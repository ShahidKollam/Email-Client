import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"
import UserModel from "./userModel.js"

const ClientModel = sequelize.define("Client", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clientId: {
    type: DataTypes.STRING(20),
    allowNull: true,
    unique: true,
  },
  clientName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    unique: true,
  },
  apiToken: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  clientSecret: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  entityId: {
    type: DataTypes.STRING(50),
    references: {
      model: UserModel,
      key: "entityId",
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: UserModel,
      key: "id",
    },
    allowNull: false,
  },
})

UserModel.hasMany(ClientModel, { foreignKey: "userId" })
ClientModel.belongsTo(UserModel, { foreignKey: "userId" })

UserModel.hasMany(ClientModel, { foreignKey: "entityId", sourceKey: "entityId" })
ClientModel.belongsTo(UserModel, { foreignKey: "entityId", targetKey: "entityId" })

export default ClientModel
