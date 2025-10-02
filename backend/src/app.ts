import express from 'express';
import cors from 'cors';
import routes from './routes/index.ts';
import swagger from './docs/swagger.ts';

export function createApp() {
  const app = express();
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());

  app.use('/', routes);
  app.use('/', swagger);

  // Health check
  app.get('/health', (_req, res) => res.json({ ok: true }));

  // 404
  app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

  return app;
}
