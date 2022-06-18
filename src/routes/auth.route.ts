import express, { Router } from 'express'
import { isLoggedIn } from '../middlewares/isLoggedIn'
import { authorize } from '../middlewares/authorize'
import { logout } from '../controllers/auth/logout.controller'
import * as login from '../controllers/auth/login.controller'
import * as register from '../controllers/auth/register.controller';
import { sendVerificationEmail, verifyEmail } from '../controllers/auth/email.controller'
import { forgotPassword, resetPassword, changePassword } from '../controllers/auth/password.controller'
import { validate } from '../middlewares/validate'
import * as authValidator from '../validators/auth.validators'
import uploader from '../utils/uploader'


const router: Router = express.Router();

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
// Uploading File Endpoint
router.post('/upload', uploader.single('images'), (req, res)=>{
    // @ts-ignore
    console.log(req.file)
    res.send('Single file upload')
})

export { router as authRouter }