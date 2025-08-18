import express from "express"
import { getDomains, createDomain, updateDomain, deleteDomain } from "../controllers/domainController.js"

const router = express.Router()

router.get("/get-domain/:userId", getDomains)
router.post("/add-domain/:userId", createDomain)
router.put("/update/:id", updateDomain)
router.delete("/delete/:id", deleteDomain)

export default router
