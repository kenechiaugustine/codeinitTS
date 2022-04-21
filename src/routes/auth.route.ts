import express, { Router } from 'express'

const router: Router = express.Router();


import { logout } from '../controllers/auth/logout.controller'
import * as login from '../controllers/auth/login.controller'
import * as register from  '../controllers/auth/register.controller';





// Register
router.post('/register', register.register);
router.post('/register/google', register.registerWithGoogle);


// Login
router.post('/login', login.login)
router.post('/login/google', login.loginWithGoogle)


// Logout
router.post('/logout', logout)







export { router as authRouter}