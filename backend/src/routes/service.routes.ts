import { Router } from 'express';
import { listServices, getServiceBySlug } from '../controllers/service.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { serviceQuerySchema } from '../schemas/service.schema.js';

const router = Router();

router.get('/', validate(serviceQuerySchema), listServices);
router.get('/:slug', getServiceBySlug);

export default router;
