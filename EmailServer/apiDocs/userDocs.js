const userDocs = {
  paths: {
    "/api/user/userList": {
      get: {
        tags: ["Users"],
        summary: "List All Users",
        description: "Retrieve a list of all users, excluding their password fields.",
        responses: {
          200: {
            description: "List of users retrieved successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/UserDetails" }, // Corrected reference
                },
                example: [
                  {
                    id: "12345",
                    name: "John Doe",
                    email: "johndoe@example.com",
                    mobileNumber: "+1234567890",
                    entityName: "Acme Corp",
                    createdAt: "2024-01-01T00:00:00Z",
                    updatedAt: "2024-01-02T00:00:00Z",
                  },
                ],
              },
            },
          },
          500: {
            description: "Server error or unable to fetch users.",
            content: {
              "application/json": {
                example: { message: "Internal server error." },
              },
            },
          },
        },
      },
    },
    "/api/user/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get User by ID",
        description: "Retrieve a specific user's details by their unique ID, excluding the password field.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Unique identifier of the user",
            schema: { type: "string" },
            example: "12345",
          },
        ],
        responses: {
          200: {
            description: "User details retrieved successfully.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserDetails" }, // Corrected reference
                example: {
                  id: "12345",
                  name: "John Doe",
                  email: "johndoe@example.com",
                  mobileNumber: "+1234567890",
                  entityName: "Acme Corp",
                  createdAt: "2024-01-01T00:00:00Z",
                  updatedAt: "2024-01-02T00:00:00Z",
                },
              },
            },
          },
          404: {
            description: "User not found.",
            content: {
              "application/json": {
                example: { message: "User not found." },
              },
            },
          },
          500: {
            description: "Server error or unable to fetch user details.",
            content: {
              "application/json": {
                example: { message: "Internal server error." },
              },
            },
          },
        },
      },
    },
  },
}

export default userDocs
