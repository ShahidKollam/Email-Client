const schema = {
  components: {
    schemas: {
      // Authentication Schemas
      Template: {
        type: "object",
        properties: {
          id: { type: "string" },
          userId: { type: "string" },
          template_name: { type: "string" },
          template_description: { type: "string" },
          subject: { type: "string" },
          category: { type: "string" },
          html_content: { type: "string" },
          css_content: { type: "string" },
          api_url: { type: "string" },
          isDefault: { type: "boolean" },
          isApproved: { type: "boolean" },
        },
      },
      TemplateWithUser: {
        type: "object",
        properties: {
          id: { type: "string" },
          template_name: { type: "string" },
          template_description: { type: "string" },
          category: { type: "string" },
          html_content: { type: "string" },
          css_content: { type: "string" },
          api_url: { type: "string" },
          isDefault: { type: "boolean" },
          isApproved: { type: "boolean" },
          user: {
            type: "object",
            properties: {
              name: { type: "string" },
            },
          },
        },
      },
      UserCredentials: {
        type: "object",
        properties: {
          email: { type: "string", description: "User's email address" },
          password: { type: "string", description: "User's password" },
        },
        required: ["email", "password"],
      },
      OTPRequest: {
        type: "object",
        properties: {
          method: { type: "string", enum: ["email", "mobile"], description: "Method to send OTP" },
          email: { type: "string", description: "User's email address" },
          mobileNumber: { type: "string", description: "User's mobile number" },
        },
        required: ["method"],
      },
      OTPVerification: {
        type: "object",
        properties: {
          email: { type: "string", description: "User's email address" },
          otp: { type: "string", description: "OTP received by the user" },
        },
        required: ["email", "otp"],
      },

      // User Schemas
      UserDetails: {
        type: "object",
        properties: {
          id: { type: "string", description: "User ID" },
          name: { type: "string", description: "User's name" },
          email: { type: "string", description: "User's email" },
          mobileNumber: { type: "string", description: "User's mobile number" },
          entityName: { type: "string", description: "Entity name associated with the user" },
          createdAt: { type: "string", format: "date-time", description: "Account creation date" },
          updatedAt: { type: "string", format: "date-time", description: "Last update date" },
        },
      },
    },
  },
}

export default schema
