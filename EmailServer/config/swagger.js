import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import userDocs from "../apiDocs/userDocs.js"
import authDocs from "../apiDocs/authDocs.js"
import schema from "../apiDocs/swaggerSchema.js"
import emailTemplateDocs from "../apiDocs/templateDocs.js"
import clientDocs from "../apiDocs/clientDocs.js"
import sendMailDocs from "../apiDocs/sendMailDocs.js"

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Email Template Service API Documentation",
      version: "1.0.0",
      description: "API documentation for the Email Template Service application",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
    components: schema.components, // Use the schema directly from the imported object
  },
  apis: ["./apiDocs/*.js"],
}
const swaggerSpec = swaggerJsdoc(swaggerOptions)

swaggerSpec.paths = {
  ...swaggerSpec.paths,
  ...sendMailDocs.paths,
  ...userDocs.paths,
  ...authDocs.paths,
  ...emailTemplateDocs.paths,
  ...clientDocs.paths,
}

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default swaggerSpec
