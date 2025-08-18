import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
})

// Sleep helper function
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Send bulk emails with delay
const sendBulkEmailsWithDelay = async (recipients, subject, content) => {
  for (const recipient of recipients) {
    try {
      await transporter.sendMail({
        from: process.env.NODEMAILER_USER,
        to: recipient,
        subject: subject,
        html: content,
      })
      console.log(`Email sent to ${recipient}`)
      await sleep(100)
    } catch (error) {
      console.error(`Failed to send to ${recipient}:`, error.message)
    }
  }
}

export { sendBulkEmailsWithDelay }
