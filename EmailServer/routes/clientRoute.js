import express from "express"
import {
  createClient,
  getAllClientByUserId,
  updateClient,
  deleteClient,
  getEntity,
} from "../controllers/clientController.js"

const router = express.Router()

router.post("/createClient", createClient)
router.get("/getEntity/:userId", getEntity)
router.get("/clients/:userId", getAllClientByUserId)
router.put("/clients/:id", updateClient)
router.delete("/clients/:id", deleteClient)

export default router
