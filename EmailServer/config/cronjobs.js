import cron from "node-cron"
import { automateEmail } from "../services/sendScheduledMailService.js"

export const initializeCronJobs = () => {
  // cron.schedule('* * * * * *', async () => {
  cron.schedule("*/10 * * * * *", async () => {
    await automateEmail()
  })

  console.log("Cron jobs initialized.")
}
