import { getChannel } from "../../config/rabbitmq.js"

// API for sending data to the queue
// const registerQMessge = async (queueName, emailData) => {
//     try {
//         const channel = await getChannel();

//         channel.sendToQueue(queueName, Buffer.from(JSON.stringify(emailData)), { persistent: true });

//         console.log('Email published in queue');

//     } catch (error) {

//         console.error('Error sending to queue:', error);
//         throw error;
//     }
// };
const registerQMessge = async (queueName, emailData) => {
  try {
    const channel = await getChannel()

    // Adding a small delay before publishing  to simulate async behavior
    setTimeout(() => {
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(emailData)), { persistent: true })
      console.log("Email published in queue")
    }, 0) // 1-second delay to simulate async behavior
  } catch (error) {
    console.error("Error sending to queue:", error)
    throw error
  }
}

// export default registerQMessge;

export default registerQMessge
