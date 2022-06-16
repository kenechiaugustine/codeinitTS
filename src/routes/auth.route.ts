import express, { Router } from 'express'

const router: Router = express.Router();

import { isLoggedIn } from '../middlewares/isLoggedIn'
import { authorize } from '../middlewares/authorize'

import { logout } from '../controllers/auth/logout.controller'
import * as login from '../controllers/auth/login.controller'
import * as register from '../controllers/auth/register.controller';
import { sendVerificationEmail, verifyEmail } from '../controllers/auth/email.controller'
import { forgotPassword, resetPassword, changePassword } from '../controllers/auth/password.controller'


import { validate } from '../middlewares/validate'
import * as authValidator from '../validators/auth.validators'

// Register
router.post('/register', validate(authValidator.register), register.register);
router.post('/register/google', register.registerWithGoogle);

// Login
router.post('/login', validate(authValidator.login), login.login)
router.post('/login/google', login.loginWithGoogle)

// Logout
router.post('/logout', logout)

// Password Endpoint
router.post('/forgot-password', validate(authValidator.forgotPassword), forgotPassword)
router.post('/reset-password', validate(authValidator.resetPassword), resetPassword)

// Protected Routes

// Verify Email Endpoint
router.post('/send-verification-email', validate(authValidator.sendVerificationEmail), isLoggedIn, sendVerificationEmail)
router.get('/verify-email', validate(authValidator.verifyEmail), isLoggedIn, verifyEmail)

// Change Password Endpoint
router.post('/change-password', validate(authValidator.changePassword), isLoggedIn, changePassword)



// Admin Simulation ---> Remove this later
router.post('/admin', isLoggedIn, authorize('admin'), (req, res) => {
    // @ts-ignore
    res.status(200).send({msg:'You are welcome to the ADMIN area', user: req.user})
})

router.post('/valid', validate(authValidator.register), (req, res) => {
    res.status(200).send('You are welcome to the VALIDATION area')
})




export { router as authRouter }