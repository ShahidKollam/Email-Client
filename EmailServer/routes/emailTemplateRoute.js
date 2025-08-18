import express from "express"
import {
  createTemplate,
  getTemplateById,
  getTemplateListWithUsers,
  deleteTemplate,
  updateTemplate,
  getCustomTemplate,
  getGeneralTemplate,
  cloneTemplate,
  get_TemplateById,
  getAllTemplatesByUserId,
} from "../controllers/emailTemplateControler.js"
import { validateClientEmailReq } from "../middleware/validateClientEmailReq.js"
const router = express.Router()

router.post("/save-template", createTemplate)
router.post("/clone-template", cloneTemplate)

// for external API use getAllTemplates
router.get("/get-templates/:userId", validateClientEmailReq, getAllTemplatesByUserId)
router.get("/get-templateById/:templateId", validateClientEmailReq, get_TemplateById)

router.get("/templateList", getTemplateListWithUsers)

router.get("/templateById/:id", getTemplateById)
router.get("/custom-template/:id", getCustomTemplate)
router.get("/general-templates", getGeneralTemplate)

router.delete("/deleteTemplate/:id", deleteTemplate)
router.put("/update-template/:id", updateTemplate)

export default router
