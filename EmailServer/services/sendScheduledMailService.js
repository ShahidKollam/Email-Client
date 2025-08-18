import juice from "juice"
import moment from "moment"
import { deleteScheduledEmail, getScheduledEmails, updateEmailStatus } from "./scheduleMailService.js"
import EmailTemplate from "../models/emailTemplateModel.js"
import { injectCSSInHtml } from "../utils/injectCss.ForEmail.js"
import registerQMessge from "../messageQueue/email/emailProducer.js"

export const automateEmail = async () => {
  try {
    const scheduledEmails = await getScheduledEmails()

    if (!scheduledEmails || scheduledEmails.length === 0) {
      console.log("No emails scheduled for now.")
      return
    }

    const currentDate = moment().format("YYYY-MM-DD")
    const currentTime = moment().format("HH:mm")

    for (const email of scheduledEmails) {
      const { dateInput, timeInput, templateId, recipient, id, placeholders } = email

      // console.log(placeholders);

      if (currentDate === dateInput && currentTime === timeInput) {
        try {
          const template = await EmailTemplate.findByPk(templateId)
          if (!template) {
            console.error(`Template not found for ID ${templateId}`)
            continue
          }

          let emailContent = injectCSSInHtml(template.html_content, template.css_content)

          for (const [key, value] of Object.entries(placeholders)) {
            emailContent = emailContent.replace(new RegExp(`{{${key}}}`, "g"), value)
          }

          const inlinedHtml = juice(emailContent)
          const emailData = {
            recipient,
            subject: template.subject,
            htmlContent: inlinedHtml,
          }

          // call this api to publish message in q
          await registerQMessge("emailQueue", emailData)

          // await sendEmail(template.subject, inlinedHtml, { recipient });
          console.log(`Email sent to ${recipient} using template ID ${templateId}`)

          await deleteScheduledEmail(id)
        } catch (error) {
          console.error(`Error sending email to ${recipient}:`, error)
          await updateEmailStatus(id, "failed")
        }
      }
    }
  } catch (error) {
    console.error("Error scheduling emails:", error)
  }
}
