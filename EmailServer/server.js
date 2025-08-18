import express from "express"
import { errorHandler } from "./middleware/errorHandler.js"
import cors from "cors"
import routes from "./routes/index.js"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { initializeCronJobs } from "./config/cronjobs.js"
import { setupSwagger } from "./config/swagger.js"
// import { connectRabbit } from "./config/rabbitmq.js"

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
 
app.use("/api", routes)
 
setupSwagger(app) 

// for automating email send
initializeCronJobs()
// connectRabbit()

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

// http://localhost:3001/api/sendmail/sendmailbyid
