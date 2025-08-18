import express from "express"
import {
  sendMailTemplate,
  sendCutomeMail,
  sendMailByTemplateId,
  sendBulkMail,
  createScheduledEmail,
  sendAllTemplatesByUserId,
  sendMailById_ViaMQ,
  sendBulkMail_Client,
} from "../controllers/sendMailController.js"
import { validateClientEmailReq } from "../middleware/validateClientEmailReq.js"

const router = express.Router()

router.post("/send_email", sendMailTemplate)
router.post("/sendCustomeEmail", sendCutomeMail)
router.post("/sendmailbyid", sendMailByTemplateId)
router.post("/sendBulkMail", sendBulkMail)

// for external api use
// router.post("/sendmailbyid", validateClientEmailReq, sendMailByTemplateId);
router.post("/sendBulkMail_client", validateClientEmailReq, sendBulkMail_Client)

// send mail use message queue
router.post("/send-email-mq", validateClientEmailReq, sendMailById_ViaMQ)

router.post("/automate-email", createScheduledEmail)
// router.get("/scheduledEmail", getScheduledEmails)

// for test only
router.post("/sendAllTemplates", sendAllTemplatesByUserId)

export default router
