import nodemailer from "nodemailer"

const sendEmail = async (subject, content, data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })

  const mailOptions = {
    from: "Shahid Dev",
    to: data.recipient,
    subject: `${subject}`,
    html: content,
  }

  await transporter.sendMail(mailOptions)
  // console.log(mailOptions);
}

export { sendEmail }
