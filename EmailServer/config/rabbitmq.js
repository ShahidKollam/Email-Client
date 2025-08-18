// rabbitmq.js
import amqp from "amqplib"
import dotenv from "dotenv"
// import consumeQueue from '../messageQueue/email/emailConsumer.js';

dotenv.config()

let channel
let connection

const connectRabbitMQ = async () => {
  if (!connection || !channel) {
    try {
      connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost")
      channel = await connection.createChannel()

      await channel.assertQueue("emailQueue", { durable: true })
      console.log("RabbitMQ connected and listening for message.")
      // consumeQueue("emailQueue")
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error)
      throw error // Ensure the error is thrown if the connection fails
    }
  }

  return channel // Return the channel for consumption
}

export const getChannel = connectRabbitMQ // Expose the async function to get the channel
export const connectRabbit = connectRabbitMQ // Export the connection function as well
