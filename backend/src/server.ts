import { createApp } from './app.js';
import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/db.js';

async function bootstrap() {
  const app = createApp();

  // Connect Database
  await connectDatabase();

  const server = app.listen(env.PORT, () => {
    console.log(`🌸 FixItNow Botanical Backend API listening on port ${env.PORT}`);
    console.log(`📖 Swagger API Documentation available at http://localhost:${env.PORT}/docs`);
    console.log(`🌱 Health check endpoint: http://localhost:${env.PORT}${env.API_PREFIX}/health`);
  });

  // Graceful shutdown handling
  const signals = ['SIGTERM', 'SIGINT'];
  for (const signal of signals) {
    process.on(signal, async () => {
      console.log(`\n🛑 Received ${signal}, shutting down gracefully...`);
      server.close(async () => {
        await disconnectDatabase();
        console.log('✅ Server and database connections terminated safely.');
        process.exit(0);
      });
    });
  }
}

bootstrap().catch((error) => {
  console.error('❌ Failed to launch backend server:', error);
  process.exit(1);
});
