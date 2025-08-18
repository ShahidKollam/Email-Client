const authDocs = {
  paths: {
    "/api/auth/signup": {
      post: {
        tags: ["Authentication"],
        summary: "Create a New User Account",
        description: "Registers a new user with the provided details (excluding sensitive data).",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", description: "User's full name" },
                  email: { type: "string", description: "User's email address" },
                  password: { type: "string", description: "User's password" },
                  mobileNumber: { type: "string", description: "User's mobile number" },
                  entityName: { type: "string", description: "Entity name associated with the user" },
                },
                required: ["name", "email", "password", "mobileNumber"],
              },
            },
          },
        },
        responses: {
          201: { description: "User account created successfully" },
          400: { description: "User already exists or invalid input" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Authenticate User and Generate Token",
        description: "Logs in the user and generates a JWT token for further authentication.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserCredentials" },
            },
          },
        },
        responses: {
          200: { description: "Login successful, token generated" },
          400: { description: "Invalid email or password" },
        },
      },
    },
    "/api/auth/send-otp": {
      post: {
        tags: ["Authentication"],
        summary: "Send OTP for Verification",
        description: "Sends a one-time password (OTP) to the user's email or mobile for verification.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OTPRequest" },
            },
          },
        },
        responses: {
          200: { description: "OTP sent successfully" },
          400: { description: "Invalid OTP method" },
          404: { description: "User not found" },
        },
      },
    },
    "/api/auth/verify-otp": {
      post: {
        tags: ["Authentication"],
        summary: "Verify OTP",
        description: "Verifies the OTP received by the user to authenticate their identity.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OTPVerification" },
            },
          },
        },
        responses: {
          200: { description: "OTP verified successfully" },
          400: { description: "Invalid OTP or OTP expired" },
          404: { description: "User not found" },
        },
      },
    },
  },
}

export default authDocs
