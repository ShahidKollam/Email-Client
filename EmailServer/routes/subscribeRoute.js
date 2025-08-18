import express from "express"
import { getSubscriberById, createSubscription, updateSubscription } from "../controllers/subscriptionController.js"

const router = express.Router()

// Subscription routes
router.post("/create", createSubscription)
router.get("/:userId", getSubscriberById)
router.put("/update/:userId", updateSubscription)

export default router
