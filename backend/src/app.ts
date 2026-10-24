import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env.js';
import { swaggerSpec } from './config/swagger.js';
import { globalLimiter } from './middlewares/rateLimiter.middleware.js';
import { requestLogger } from './middlewares/logger.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import apiRouter from './routes/index.js';

export function createApp(): Express {
  const app = express();

  // Security and compression middlewares
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(
    cors({
      origin: [env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:8000', 'https://raskirayhan.github.io'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  app.use(compression());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Logging & rate limiting
  app.use(requestLogger);
  app.use(env.API_PREFIX, globalLimiter);

  // Swagger OpenAPI Documentation UI
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

  // Mount API Router
  app.use(env.API_PREFIX, apiRouter);

  // 404 Handler for undefined API routes
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: `API endpoint '${req.method} ${req.originalUrl}' does not exist. Refer to /docs for available routes.`,
    });
  });

  // Global Error Handler
  app.use(errorHandler);

  return app;
}
