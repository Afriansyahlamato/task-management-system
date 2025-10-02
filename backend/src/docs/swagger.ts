import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { openapiSpec } from './openapi.ts';

const router = Router();

// JSON spec
router.get('/docs-json', (_req, res) => {
  res.json(openapiSpec);
});

// UI
router.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec as any, {
  customSiteTitle: 'Task Management API Docs',
}));

export default router;
