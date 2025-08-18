import twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

const client = twilio(accountSid, authToken)

export const sendSms = async (otp, mobileNumber) => {
  // Ensure the number is in E.164 format
  const formattedNumber = mobileNumber.startsWith("+") ? mobileNumber : `+91${mobileNumber}`

  try {
    const message = await client.messages.create({
      body: `Your OTP code is ${otp}`, // Message content
      from: twilioPhoneNumber, // Your Twilio phone number from env
      to: formattedNumber, // Recipient's mobile number
    })

    console.log(`OTP sent successfully to ${formattedNumber}:`, message.sid)
    return message
  } catch (error) {
    console.error("Error sending OTP via SMS:", error)
    throw new Error("Failed to send OTP via SMS")
  }
}
