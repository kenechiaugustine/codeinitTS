import dotenv from 'dotenv';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './.env' });

// Setup express server
import app from './app';
import { createServer } from 'http';

const server = createServer(app);

// Connect to the database
import DatabaseConnection from './config/db.config';
DatabaseConnection;

const PORT = process.env.PORT || 4001;
// Server Start
server.listen(PORT, () =>
  console.log(`🚀 Application running on port: ${PORT}...`)
);

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  // @ts-ignore
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
