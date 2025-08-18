const sendMailDocs = {
  paths: {
    "/api/sendmail/sendmailbyid": {
      post: {
        tags: ["Email"],
        summary: "Send Email by Template ID",
        description: "Sends an email using a template by its ID, replacing placeholders.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  templateId: { type: "string", description: "Template ID" },
                  recipient: { type: "string", description: "Recipient's email address" },
                  placeholders: {
                    type: "object",
                    description: "Placeholders to be replaced in the template",
                    additionalProperties: { type: "string" },
                  },
                },
                required: ["templateId", "recipient"],
              },
            },
          },
        },
        responses: {
          200: { description: "Email sent successfully" },
          404: { description: "Template not found" },
          400: { description: "Error in sending email" },
        },
      },
    },
    "/api/sendmail/sendBulkMail": {
      post: {
        tags: ["Email"],
        summary: "Send Bulk Emails",
        description: "Sends emails to multiple recipients using a specified template.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  recipients: {
                    type: "array",
                    items: { type: "string" },
                    description: "List of recipient email addresses",
                  },
                  templateId: { type: "string", description: "Template ID" },
                },
                required: ["recipients", "templateId"],
              },
            },
          },
        },
        responses: {
          200: { description: "Bulk emails sent successfully" },
          404: { description: "Template not found" },
          400: { description: "Error in sending bulk emails" },
        },
      },
    },
    "/api/sendmail/automate-email": {
      post: {
        tags: ["Email"],
        summary: "Create a Scheduled Email",
        description: "Schedules an email to be sent at a later time with the specified recipient and template.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  timeInput: { type: "string", description: "Time at which to send the email" },
                  dateInput: { type: "string", description: "Date when the email should be sent" },
                  recipient: { type: "string", description: "Recipient's email address" },
                  templateId: { type: "string", description: "Template ID" },
                  placeholders: {
                    type: "object",
                    description: "Placeholders to be replaced in the template",
                    additionalProperties: { type: "string" },
                  },
                },
                required: ["timeInput", "dateInput", "recipient", "templateId"],
              },
            },
          },
        },
        responses: {
          201: { description: "Scheduled email created successfully" },
          400: { description: "Error creating scheduled email" },
        },
      },
    },
    // "/api/sendmail/sendAllTemplates": {
    //   post: {
    //     tags: ["Email"],
    //     summary: "Send All Templates for a User",
    //     description: "Sends all email templates associated with a user to a specified recipient.",
    //     requestBody: {
    //       required: true,
    //       content: {
    //         "application/json": {
    //           schema: {
    //             type: "object",
    //             properties: {
    //               userId: { type: "string", description: "User ID" },
    //               recipient: { type: "string", description: "Recipient's email address" },
    //               placeholders: {
    //                 type: "object",
    //                 description: "Placeholders to be replaced in each template",
    //                 additionalProperties: { type: "string" },
    //               },
    //             },
    //             required: ["userId", "recipient"],
    //           },
    //         },
    //       },
    //     },
    //     responses: {
    //       200: { description: "All templates sent successfully" },
    //       400: { description: "Error in sending templates" },
    //     },
    //   },
    // },
  },
}

export default sendMailDocs
