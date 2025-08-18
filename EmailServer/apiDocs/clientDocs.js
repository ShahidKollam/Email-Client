const clientDocs = {
  paths: {
    "/api/entity/createClient": {
      post: {
        tags: ["Clients"],
        summary: "Create a new client",
        description: "Creates a new client associated with a user and entity.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  entityId: { type: "string" },
                  userId: { type: "string" },
                  clientName: { type: "string" },
                },
                required: ["entityId", "userId", "clientName"],
              },
              example: {
                entityId: "1",
                userId: "123",
                clientName: "Client A",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Client successfully created.",
            content: {
              "application/json": {
                example: { message: "Successfully created." },
              },
            },
          },
          500: {
            description: "Server error.",
            content: {
              "application/json": {
                example: { message: "Server error" },
              },
            },
          },
        },
      },
    },
    "/api/entity/getEntity/{userId}": {
      get: {
        tags: ["Clients"],
        summary: "Get entity details by user ID",
        description: "Fetches the entity details (name and ID) associated with a user.",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Unique identifier of the user",
          },
        ],
        responses: {
          200: {
            description: "Entity details retrieved successfully.",
            content: {
              "application/json": {
                example: {
                  entityName: "Sample Entity",
                  entityId: "123",
                },
              },
            },
          },
          404: {
            description: "User not found.",
            content: {
              "application/json": {
                example: { error: "User not found" },
              },
            },
          },
          500: {
            description: "Failed to fetch entity data.",
            content: {
              "application/json": {
                example: { error: "Failed to fetch entity data" },
              },
            },
          },
        },
      },
    },
    "/api/entity/clients/{userId}": {
      get: {
        tags: ["Clients"],
        summary: "Get all clients for a user",
        description: "Fetches all clients associated with a specific user ID.",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Unique identifier of the user",
          },
        ],
        responses: {
          200: {
            description: "Clients retrieved successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      clientId: { type: "string" },
                      clientName: { type: "string" },
                      entityId: { type: "string" },
                      userId: { type: "string" },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Clients not found for the user.",
            content: {
              "application/json": {
                example: { message: "Client not found" },
              },
            },
          },
          500: {
            description: "Server error while retrieving clients.",
            content: {
              "application/json": {
                example: { message: "Server error" },
              },
            },
          },
        },
      },
    },
    "/api/entity/clients/{id}": {
      put: {
        tags: ["Clients"],
        summary: "Update client details",
        description: "Updates the details of an existing client by its ID.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Unique identifier of the client to be updated",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  clientId: { type: "string" },
                  apiToken: { type: "string" },
                  clientSecret: { type: "string" },
                  entityId: { type: "string" },
                  userId: { type: "string" },
                },
              },
              example: {
                clientId: "abcd123",
                apiToken: "token123",
                clientSecret: "secret123",
                entityId: "1",
                userId: "123",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Client updated successfully.",
            content: {
              "application/json": {
                example: { message: "Client updated successfully" },
              },
            },
          },
          404: {
            description: "Client not found or no changes made.",
            content: {
              "application/json": {
                example: { message: "Client not found or no changes made" },
              },
            },
          },
          500: {
            description: "Error updating client.",
            content: {
              "application/json": {
                example: { message: "Error updating client" },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Clients"],
        summary: "Delete a client by ID",
        description: "Deletes a client based on the provided client ID.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Unique identifier of the client to be deleted",
          },
        ],
        responses: {
          200: {
            description: "Client deleted successfully.",
            content: {
              "application/json": {
                example: { message: "Client deleted successfully" },
              },
            },
          },
          404: {
            description: "Client not found.",
            content: {
              "application/json": {
                example: { message: "Client not found" },
              },
            },
          },
          500: {
            description: "Error deleting client.",
            content: {
              "application/json": {
                example: { message: "Error deleting client" },
              },
            },
          },
        },
      },
    },
  },
}

export default clientDocs
