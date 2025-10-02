import { Router } from 'express';
import * as securityController from '../api/external/security/controller';

const router = Router();

// Security routes (authentication, registration, etc.)
router.post('/auth/login', securityController.loginHandler);
router.post('/auth/register', securityController.registerHandler);
router.post('/auth/forgot-password', securityController.forgotPasswordHandler);

// Public routes
router.get('/public/info', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'Counter API',
      version: '1.0.0',
      description: 'API for counting from 1 to 10',
    },
  });
});

export default router;
