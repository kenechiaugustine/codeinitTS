import express, { Router } from 'express';

// Middlewares
import * as auth from '../middlewares/auth';

// Validation
import { validate } from '../middlewares/validate';
import * as authValidator from '../validators/auth.validators';

// Controllers
import * as register from '../controllers/auth/register.controller';
import * as login from '../controllers/auth/login.controller';
import { logout } from '../controllers/auth/logout.controller';
import * as emailController from '../controllers/auth/email.controller';
import * as passwordController from '../controllers/auth/password.controller';
import { Email } from '../utils/Email';

// Router Definition
const router: Router = express.Router();
/////////////////////////////////////////////////////

// Register
router.post('/register', validate(authValidator.register), register.register);

// Login
router.post('/login', validate(authValidator.login), login.login);

// Logout
router.post('/logout', logout);

// Forgot password
router.post(
  '/forgot-password',
  validate(authValidator.forgotPassword),
  passwordController.forgotPassword
);

// Reset password
router.post(
  '/reset-password',
  validate(authValidator.resetPassword),
  passwordController.resetPassword
);

// Send verification email
router.post(
  '/send-verification-email',
  validate(authValidator.sendVerificationEmail),
  auth.isLoggedIn,
  emailController.sendVerificationEmail
);

// Verify email
router.post(
  '/verify-email',
  validate(authValidator.verifyEmail),
  auth.isLoggedIn,
  emailController.verifyEmail
);

// Change Password
router.post(
  '/change-password',
  validate(authValidator.changePassword),
  auth.isLoggedIn,
  passwordController.changePassword
);

// Admin Simulation
router.get('/admin', auth.isLoggedIn, auth.authorize('admin'), (req, res) => {
  // @ts-ignore
  res.status(200).send({
    status: 'ok',
    message: 'You are welcome to the ADMIN area',
    // @ts-ignore
    user: req.user,
  });
});

// Sample Email sending route
router.post('/send-email', async (req, res) => {
  await new Email(
    {
      email: 'kenechiaugustine@gmail.com',
      firstName: 'Kenechukwu',
    },
    'https://XXXXXXX.com/verify-email?token=XXXXXXX'
  ).send('base', 'welcome to the platform');

  res.status(200).send({
    status: 'ok',
    message: 'Email sent successfully',
  });
});

////////////////////////////////////////////////////
export { router as authRouter };
