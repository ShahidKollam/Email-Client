import juice from "juice"
import EmailTemplate from "../models/emailTemplateModel.js"
import { sendEmail } from "../utils/sendEmail.js"
import { injectCSSInHtml } from "../utils/injectCss.ForEmail.js"
import registerQMessge from "../messageQueue/email/emailProducer.js"

export const sendEmailBulkAndSingle = async (req, res, next) => {
  try {
    const { recipients, placeholders, templateId } = req.body
    console.log(req.body)

    const template = await EmailTemplate.findByPk(templateId)

    if (!template) {
      return res.status(404).json({ success: false, error: "Template not found" })
    }
    if (!recipients || recipients.length === 0) {
      return res.status(400).json({ success: false, error: "No recipients provided." })
    }

    const subject = template.subject
    let emailContent = template.html_content

    emailContent = injectCSSInHtml(emailContent, template.css_content)
    const inlinedHtml = juice(emailContent)

    if (template.category === "marketing_campaign") {
      const personalizeContent = (name) => {
        return inlinedHtml.replace(/{{clientName}}/g, name || "Valued User")
      }

      for (const recipient of recipients) {
        const { email, name } = recipient

        const personalizedHtml = personalizeContent(name)
        const emailData = {
          recipient: email,
          subject: subject,
          htmlContent: personalizedHtml,
        }

        registerQMessge("emailQueue", emailData)
      }

      return res.status(200).json({ success: true, message: "Bulk email tasks have been queued for processing!" })
    }
    if (placeholders) {
      for (const [key, value] of Object.entries(placeholders)) {
        emailContent = emailContent.replace(new RegExp(`{{${key}}}`, "g"), value)
      }
    }

    if (template.category !== "marketing_campaign") {
      await sendEmail(subject, inlinedHtml, { recipients })

      return res.status(200).json({ success: true, message: "Email sent successfully" })
    } else {
      return res.status(400).json({
        success: false,
        error: "Invalid request: either provide a recipient for single email or recipients for bulk email.",
      })
    }
  } catch (error) {
    console.error("Error in email controller:", error)
    next(error)
  }
}
