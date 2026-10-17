const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "FactoryFlow API",
            version: "1.0.0",
            description: "Documentation de l'API FactoryFlow"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Serveur local"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: ["./src/routes/*.js"]
};

module.exports = swaggerJsdoc(options);
