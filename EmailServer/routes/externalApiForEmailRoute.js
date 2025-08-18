import express from "express"
import { sendEmailBulkAndSingle } from "../controllers/externalApiForEmailController.js"
import { validateClientEmailReq } from "../middleware/validateClientEmailReq.js"

const router = express.Router()

router.post("/send-email-to-client", validateClientEmailReq, sendEmailBulkAndSingle)

export default router
