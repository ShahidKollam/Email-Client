const emailTemplateDocs = {
  paths: {
    "/api/template/save-template": {
      post: {
        tags: ["Templates"],
        summary: "Create a new email template",
        description: "Creates a new email template and returns the created template.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userId: { type: "string" },
                  template_name: { type: "string" },
                  template_description: { type: "string" },
                  subject: { type: "string" },
                  category: { type: "string" },
                  html_content: { type: "string" },
                  css_content: { type: "string" },
                },
                required: ["userId", "template_name", "html_content", "css_content"],
              },
              example: {
                userId: "12345",
                template_name: "Welcome Email",
                template_description: "An email to welcome new users",
                subject: "Welcome to our platform!",
                category: "Onboarding",
                html_content: "<h1>Welcome {{name}}</h1>",
                css_content: "h1 { color: blue; }",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Template created successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: { $ref: "#/components/schemas/Template" },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request due to missing required fields.",
            content: {
              "application/json": {
                example: { error: "Template name, HTML, and CSS content are required." },
              },
            },
          },
        },
      },
    },
    "/api/template/templateList": {
      get: {
        tags: ["Templates"],
        summary: "Get all templates with associated users",
        description: "Fetches a list of all templates along with their associated users' names.",
        responses: {
          200: {
            description: "Templates retrieved successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/TemplateWithUser" },
                },
              },
            },
          },
          404: {
            description: "No templates found.",
            content: {
              "application/json": {
                example: { error: "No templates found." },
              },
            },
          },
        },
      },
    },
    "/api/template/templateById/{id}": {
      get: {
        tags: ["Templates"],
        summary: "Get a template by ID",
        description: "Retrieve the details of a specific template using its ID.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Unique identifier of the template",
          },
        ],
        responses: {
          200: {
            description: "Template details retrieved successfully.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Template" },
              },
            },
          },
          404: {
            description: "Template not found.",
            content: {
              "application/json": {
                example: { error: "Template not found." },
              },
            },
          },
        },
      },
    },

    "/api/template/delete-template/{id}": {
      delete: {
        tags: ["Templates"],
        summary: "Delete an email template by ID",
        description: "Deletes a specific email template using its ID.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Unique identifier of the template to be deleted",
          },
        ],
        responses: {
          200: {
            description: "Template deleted successfully.",
            content: {
              "application/json": {
                example: {
                  message: "Template deleted successfully",
                },
              },
            },
          },
          404: {
            description: "Template not found.",
            content: {
              "application/json": {
                example: {
                  error: "Template not found",
                },
              },
            },
          },
          500: {
            description: "Internal server error.",
            content: {
              "application/json": {
                example: {
                  error: "Error deleting template",
                },
              },
            },
          },
        },
      },
    },
  },
}

export default emailTemplateDocs
