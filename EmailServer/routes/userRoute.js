import express from "express"
import { getUserById, userList } from "../controllers/userController.js"

const router = express.Router()

router.get("/userList", userList)
router.get("/:id", getUserById)

export default router
