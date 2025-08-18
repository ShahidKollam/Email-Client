import { sendEmail } from "../../utils/sendEmail.js"
import { getChannel } from "../../config/rabbitmq.js"
import dotenv from "dotenv"
import path from "path"

const rootDir = process.cwd()
const envPath = path.join(rootDir, "../../.env")
dotenv.config({ path: envPath })

const consumeQueue = async (queueName) => {
  const channel = await getChannel()

  channel.consume(
    queueName,
    async (msg) => {
      if (msg !== null) {
        try {
          const emailData = JSON.parse(msg.content.toString())
          await sendEmail(emailData.subject, emailData.htmlContent, { recipient: emailData.recipient })
          console.log(`Email sent to ${emailData.recipient}`)
          channel.ack(msg)
        } catch (error) {
          console.error("Error processing email task:", error)
          channel.nack(msg, false, false)
        }
      }
    },
    { noAck: false },
  )

  console.log("Consumer listening...")
}

consumeQueue("emailQueue").catch(console.error)
