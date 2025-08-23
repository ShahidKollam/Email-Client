import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
})

const testConnection = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync() // `alter: true` will update existing tables to match models, without dropping them.

    // await sequelize.sync({ alter: true })

    console.log("SQL DB Connected successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

testConnection() 

export default sequelize
