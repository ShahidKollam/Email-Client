import express from "express"
import emailTemplateRoute from "./emailTemplateRoute.js"
import sendMail from "./sendMail.js"
import authRoute from "./authRoute.js"
import userRoute from "./userRoute.js"
import subscribeRoute from "./subscribeRoute.js"
import externalApiForEmailRoute from "./externalApiForEmailRoute.js"
import domainRoutes from "./domainRoutes.js"
import clientRoute from "./clientRoute.js"

const router = express.Router()

router.use("/auth", authRoute)
router.use("/template", emailTemplateRoute)
router.use("/sendmail", sendMail)
router.use("/user", userRoute)
router.use("/subscription", subscribeRoute) 
router.use("/client", externalApiForEmailRoute)
router.use("/domain", domainRoutes) 
router.use("/entity", clientRoute)

export default router
 