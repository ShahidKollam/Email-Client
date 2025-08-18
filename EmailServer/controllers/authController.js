import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import UserModel from "../models/userModel.js"
import { sendEmail } from "../utils/sendEmail.js"
import { sendSms } from "../utils/sendOtpSms.js"
import { nanoid } from "nanoid"

export const sendOtp = async (req, res, next) => {
  const { method, email, mobileNumber } = req.body
  try {
    const user = await UserModel.findOne({ where: { email } })
    if (!user) {
      throw new Error("User not found")
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    user.otp = otp
    await user.save()

    const subject = "Your OTP Code for Account Verification"
    if (method === "email") {
      await sendEmail(subject, otp, { recipient: email })
      return res.status(200).json({ message: "OTP sent successfully to email" })
    }
    if (method === "mobile") {
      await sendSms(otp, mobileNumber)
      return res.status(200).json({ message: "OTP sent successfully to mobile" })
    }

    return res.status(400).json({ message: "Invalid OTP method. Please provide email or mobile." })
  } catch (error) {
    console.error(error)
    return next(error)
  }
}

export const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Email and OTP are required" })
  }

  try {
    const user = await UserModel.findOne({ where: { email } })
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP!" })
    }

    if (user.otpExpires <= new Date()) {
      return res.status(400).json({ success: false, message: "OTP has expired! Resend OTP" })
    }

    user.isVerified = true
    user.otp = null
    user.otpExpires = null
    await user.save()
    console.log(user)

    return res.status(200).json({ success: true, message: "OTP verified successfully" })
  } catch (error) {
    console.error("Error verifying OTP:", error)
    next(error)
  }
}

export const signup = async (req, res, next) => {
  const { name, email, password, mobileNumber, entityName } = req.body
  try {
    const existingUser = await UserModel.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const formattedMobileNumber = `+91${mobileNumber}`

    const newUser = await UserModel.create({
      name,
      email,
      mobileNumber: formattedMobileNumber,
      password: hashedPassword,
      entityId: nanoid(20),
      entityName,
    })

    const userResponse = newUser.toJSON()
    delete userResponse.password

    // req.body = { userId: newUser.id, entityId: newUser.entityId };
    // await createClient(req, res);

    return res.status(201).json({ message: "User created successfully.", user: userResponse })
  } catch (error) {
    console.error(error)
    return next(error)
  }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "12h", // Token expiration time
    })

    const userResponse = user.toJSON()
    delete userResponse.password // Remove the password field

    return res.status(200).json({
      message: "Login successful",
      token,
      user: userResponse,
    })
  } catch (error) {
    console.error(error)
    return next(error)
  }
}
