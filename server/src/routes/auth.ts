import express from 'express';
import { signup, login } from '../controllers/authController';

const auth = express.Router();

// Dynamic route: /api/auth/:role/:type
auth.post('/:role/:type', async (req, res) => {
  const { role, type } = req.params;

  // Validate role
  const validRoles = ['vendor', 'delivery', 'customer'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid role in URL' });
  }

  // Inject role into body for controller compatibility
  req.body.role = role;

  // Delegate to appropriate controller
  if (type === 'signup') {
    return signup(req, res);
  } else if (type === 'login') {
    return login(req, res);
  } else {
    return res.status(400).json({ error: 'Invalid auth type in URL' });
  }
});

export default auth;
