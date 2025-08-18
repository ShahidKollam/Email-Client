import path from "path"
import fs from "fs"
import dotenv from "dotenv"
import juice from "juice"
import EmailTemplate from "../models/emailTemplateModel.js"
import UserModel from "../models/userModel.js"
import { fileURLToPath } from "url"
import { sendEmail } from "../utils/sendEmail.js"
import { injectCSSInHtml } from "../utils/injectCss.ForEmail.js"
import ScheduledEmail from "../models/ScheduledEmail.js"
import registerQMessge from "../messageQueue/email/emailProducer.js"

dotenv.config()

export const sendMailTemplate = async (req, res, next) => {
  // Log the request body
  try {
    const {
      recipient,
      subject,
      appointmentDate,
      appointmentTime,
      patientName,
      doctorName,
      modeOfVisit,
      location,
      template,
    } = req.body
    const __filename = fileURLToPath(import.meta.url) // Converts the module URL to a file path
    const __dirname = path.dirname(__filename)

    const emailTemplatePath = path.join(__dirname, `../../EMTClient/public/template/${template.id}`)
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8")

    const emailContent = emailTemplate
      .replace(/{patientName}/g, patientName)
      .replace(/{appointmentDate}/g, appointmentDate)
      .replace(/{appointmentTime}/g, appointmentTime)
      .replace(/{modeOfVisit}/g, modeOfVisit)
      .replace(/{location}/g, location)

    await sendEmail(subject, emailContent, { recipient })
    res.json({ success: true })
  } catch (error) {
    console.error("Error sending emails:", error)
    return next(error)
  }
}

export const sendCutomeMail = async (req, res, next) => {
  try {
    const { email, html_content, subject } = req.body
    const recipient = email

    const inlinedHtml = juice(html_content)

    await sendEmail(subject, inlinedHtml, { recipient })

    res.json({ success: true })
  } catch (error) {
    console.error("Error sending Custome email:", error)
    return next(error)
  }
}

export const sendMailByTemplateId = async (req, res, next) => {
  try {
    const { templateId, recipient, placeholders } = req.body

    const template = await EmailTemplate.findByPk(templateId)

    const subject = template.subject

    if (!template) {
      return res.status(404).json({ success: false, error: "Template not found" })
    }

    let emailContent = template.html_content

    for (const [key, value] of Object.entries(placeholders)) {
      emailContent = emailContent.replace(new RegExp(`{{${key}}}`, "g"), value)
    }

    emailContent = injectCSSInHtml(emailContent, template.css_content)

    const inlinedHtml = juice(emailContent)

    await sendEmail(subject, inlinedHtml, { recipient })

    res.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("Error sending email by template ID:", error)
    return next(error)
  }
}

// export const sendBulkMail = async (req, res, next) => {
//   try {
//     const { recipients, templateId } = req.body;

//     const template = await EmailTemplate.findByPk(templateId);

//     const subject = template.subject

//     if (!template) {
//       return res.status(404).json({ success: false, error: "Template not found" });
//     }

//     const users = await UserModel.findAll({ attributes: ['email', 'name'] });

//     if (users.length === 0 && recipients.length === 0) {
//       return res.status(404).json({ error: "No users found to send the emails." });
//     }
//     const userMap = new Map(users.map(user => [user.email, user.name]));

//     const allRecipients = [...new Set([...users.map(user => user.email), ...recipients])];

//     let emailContent = template.html_content;

//     emailContent = injectCSSInHtml(emailContent, template.css_content);

//     const inlinedHtml = juice(emailContent);

//     const personalizeContent = (email) => {

//       const userName = userMap.get(email) || "Valued User";

//       return inlinedHtml.replace(/{{clientName}}/g, userName);
//     };

//     for (const email of allRecipients) {
//       const personalizedHtml = personalizeContent(email);
//       await sendBulkEmailsWithDelay([email], subject, personalizedHtml);
//     }

//     res.status(200).json({ success: true, message: "Emails are being sent!" });
//   } catch (error) {
//     console.error("Error sending bulk emails:", error);
//     next(error);
//   }
// };

export const sendBulkMail = async (req, res, next) => {
  try {
    const { recipients, templateId } = req.body

    const template = await EmailTemplate.findByPk(templateId)

    if (!template) {
      return res.status(404).json({ success: false, error: "Template not found" })
    }

    const subject = template.subject
    const users = await UserModel.findAll({ attributes: ["email", "name"] })

    if (users.length === 0 && recipients.length === 0) {
      return res.status(404).json({ error: "No users found to send the emails." })
    }

    const userMap = new Map(users.map((user) => [user.email, user.name]))
    const allRecipients = [...new Set([...users.map((user) => user.email), ...recipients])]

    let emailContent = template.html_content
    emailContent = injectCSSInHtml(emailContent, template.css_content)
    const inlinedHtml = juice(emailContent)

    const personalizeContent = (email) => {
      const userName = userMap.get(email) || "Valued User"
      return inlinedHtml.replace(/{{clientName}}/g, userName)
    }

    for (const email of allRecipients) {
      const personalizedHtml = personalizeContent(email)
      const emailData = {
        recipient: email,
        subject: subject,
        htmlContent: personalizedHtml,
      }

      await registerQMessge("emailQueue", emailData)
    }

    res.status(200).json({ success: true, message: "Bulk email tasks have been queued for processing!" })
  } catch (error) {
    console.error("Error sending bulk emails:", error)
    next(error)
  }
}

export const sendBulkMail_Client = async (req, res, next) => {
  try {
    const { recipients, templateId } = req.body

    const template = await EmailTemplate.findOne({
      where: {
        template_id: templateId,
      },
    })

    if (!template) {
      return res.status(404).json({ success: false, error: "Template not found" })
    }

    const subject = template.subject
    const users = await UserModel.findAll({ attributes: ["email", "name"] })

    if (users.length === 0 && recipients.length === 0) {
      return res.status(404).json({ error: "No users found to send the emails." })
    }

    const userMap = new Map(users.map((user) => [user.email, user.name]))
    const allRecipients = [...new Set([...users.map((user) => user.email), ...recipients])]

    let emailContent = template.html_content
    emailContent = injectCSSInHtml(emailContent, template.css_content)
    const inlinedHtml = juice(emailContent)

    const personalizeContent = (email) => {
      const userName = userMap.get(email) || "Valued User"
      return inlinedHtml.replace(/{{clientName}}/g, userName)
    }

    for (const email of allRecipients) {
      const personalizedHtml = personalizeContent(email)
      const emailData = {
        recipient: email,
        subject: subject,
        htmlContent: personalizedHtml,
      }

      await registerQMessge("emailQueue", emailData)
    }

    res.status(200).json({ success: true, message: "Bulk email tasks have been queued for processing!" })
  } catch (error) {
    console.error("Error sending bulk emails:", error)
    next(error)
  }
}

export const createScheduledEmail = async (req, res) => {
  try {
    const { timeInput, dateInput, recipient, templateId, placeholders } = req.body
    console.log(req.body)

    if (!timeInput || !dateInput || !recipient || !templateId) {
      return res.status(400).json({ message: "Time, Date, Recipient, and Template ID are required." })
    }

    const newScheduledEmail = await ScheduledEmail.create({
      timeInput,
      dateInput,
      recipient,
      templateId,
      placeholders: placeholders || null,
    })

    return res.status(201).json({
      message: "Scheduled email created successfully.",
      data: newScheduledEmail,
    })
  } catch (error) {
    console.error("Error creating scheduled email:", error)
    return res.status(500).json({ message: "An error occurred while creating the scheduled email." })
  }
}

export const sendAllTemplatesByUserId = async (req, res, next) => {
  try {
    const { userId, recipient, placeholders } = req.body

    if (!userId || !recipient) {
      return res.status(400).json({ message: "User ID and recipient are required." })
    }

    const user = await UserModel.findByPk(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found." })
    }

    const templates = await EmailTemplate.findAll({ where: { userId } })

    for (const template of templates) {
      let emailContent = template.html_content

      if (placeholders && typeof placeholders === "object") {
        for (const [key, value] of Object.entries(placeholders)) {
          emailContent = emailContent.replace(new RegExp(`{{${key}}}`, "g"), value)
        }
      }

      emailContent = injectCSSInHtml(emailContent, template.css_content)

      const inlinedHtml = juice(emailContent)

      await sendEmail(template.subject, inlinedHtml, { recipient })
    }

    res.status(200).json({ success: true, message: "Emails sent successfully." })
  } catch (error) {
    console.error("Error sending emails:", error)
    next(error)
  }
}

export const sendMailById_ViaMQ = async (req, res, next) => {
  try {
    const { templateId, recipient, placeholders = {} } = req.body

    const template = await EmailTemplate.findOne({
      where: {
        template_id: templateId,
      },
    })

    if (!template) {
      return res.status(404).json({ success: false, error: "Template not found" })
    }

    let emailContent = template.html_content
    for (const [key, value] of Object.entries(placeholders)) {
      emailContent = emailContent.replace(new RegExp(`{{${key}}}`, "g"), value)
    }

    emailContent = injectCSSInHtml(emailContent, template.css_content)
    const inlinedHtml = juice(emailContent)

    const emailData = {
      recipient,
      subject: template.subject,
      htmlContent: inlinedHtml,
    }

    // call this api to publish message in q
    await registerQMessge("emailQueue", emailData)

    res.json({ success: true, message: "Email task has been added to the queue for processing." })
  } catch (error) {
    console.error("Error publishing email task to queue:", error)
    return next(error)
  }
}
