// rabbitmq.js
import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

let channel;
let connection;

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://rabbitmq:5672";

const connectRabbitMQ = async (retries = 10, delay = 5000) => {
  while (retries) {
    try {
      connection = await amqp.connect(RABBITMQ_URL);
      channel = await connection.createChannel();
      await channel.assertQueue("emailQueue", { durable: true });

      console.log("✅ RabbitMQ connected and listening for messages.");
      return channel;
    } catch (error) {
      console.error(
        `❌ RabbitMQ connection failed. Retries left: ${retries - 1}`,
        error.message
      );
      retries -= 1;

      if (retries === 0) throw error;

      // wait before retrying
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

export const getChannel = async () => {
  if (!channel) {
    await connectRabbitMQ();
  }
  return channel;
};

export const connectRabbit = connectRabbitMQ;
