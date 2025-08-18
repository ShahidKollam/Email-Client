import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"
import UserModel from "./userModel.js"

const SubscriptionModel = sequelize.define("Subscription", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: UserModel,
      key: "id",
    },
    allowNull: false,
  },
  subscriptionType: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
})

UserModel.hasMany(SubscriptionModel, { foreignKey: "userId" })
SubscriptionModel.belongsTo(UserModel, { foreignKey: "userId" })

export default SubscriptionModel
