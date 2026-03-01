import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mentor Mentee API",
      version: "1.0.0",
      description: "API documentation for Mentor-Mentee platform",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },

  // ⚠️ Important path
  apis: ["./src/Router/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
