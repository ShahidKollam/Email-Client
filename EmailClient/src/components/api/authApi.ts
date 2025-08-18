const AUTH_BASE_URL = `${import.meta.env.VITE_API_SERVER_URL}`

const AUTH_URL = {
  LOGIN: `${AUTH_BASE_URL}/api/auth/login`,
  REGISTER: `${AUTH_BASE_URL}/api/auth/signup`,
  FETCH_USER: `${AUTH_BASE_URL}/api/auth/user`,
  SEND_OTP: `${AUTH_BASE_URL}/api/auth/send-otp`,
  VERIFY_OTP: `${AUTH_BASE_URL}/api/auth/verify-otp`,
}

export default AUTH_URL
