import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FixItNow - Botanical Marketplace & Services API',
      version: '1.0.0',
      description:
        'Comprehensive REST API documentation for FixItNow On-Demand Botanical Services and Marketplace, featuring JWT authentication, role-based access control (User, Admin, Manager), Stripe payments, dynamic filters, and Flora AI concierge.',
      contact: {
        name: 'Rayhan Raski',
        email: 'support@flowermarket.shop',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local Development Server',
      },
      {
        url: 'https://fixitnow-backend.onrender.com/api',
        description: 'Production Render Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT access token.',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
