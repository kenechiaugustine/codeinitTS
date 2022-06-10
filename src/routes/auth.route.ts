import express, { Router } from 'express'

const router: Router = express.Router();

import { isLoggedIn } from '../middlewares/isLoggedIn'
import { authorize } from '../middlewares/authorize'

import { logout } from '../controllers/auth/logout.controller'
import * as login from '../controllers/auth/login.controller'
import * as register from  '../controllers/auth/register.controller';
import {initializeVerifyEmail, verifyEmail} from '../controllers/auth/email.controller'



// Register
router.post('/register', register.register);
router.post('/register/google', register.registerWithGoogle);


// Login
router.post('/login', login.login)
router.post('/login/google', login.loginWithGoogle)


// Logout
router.post('/logout', logout)

// Verify Email Endpoint
router.post('/init-verify-email', initializeVerifyEmail )
router.get('/verify-email', verifyEmail )


router.use(isLoggedIn)

// Admin Simulation ---> Remove this later
router.post('/admin', authorize('admin'), (req, res) => {
    res.status(200).send('You are welcome to the ADMIN area')
})





export { router as authRouter}