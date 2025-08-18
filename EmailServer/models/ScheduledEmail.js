import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"
import EmailTemplate from "./emailTemplateModel.js"

const ScheduledEmail = sequelize.define("ScheduledEmail", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  timeInput: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  dateInput: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  recipient: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  placeholders: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  templateId: {
    type: DataTypes.INTEGER,
    references: {
      model: EmailTemplate,
      key: "id",
    },
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "sent", "failed"),
    allowNull: true,
  },
})

EmailTemplate.hasMany(ScheduledEmail, { foreignKey: "templateId", onDelete: "CASCADE" })
ScheduledEmail.belongsTo(EmailTemplate, { foreignKey: "templateId" })

export default ScheduledEmail
