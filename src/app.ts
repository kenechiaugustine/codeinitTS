import express, { Application, Express, Request, Response, NextFunction } from 'express'
import helmet from 'helmet';
import cors from 'cors';



// INIT EXPRESS

const app: Express = express()



// MIDDLEWARES

app.set('trust proxy', true)

app.use(cors());

app.use(helmet());

app.use(express.json());





// IMPORTING ROUTERS

import { userRouter }  from './.services/user/user.route'


// ROUTING / APP ENDPOINTS

app.use('/api/user', userRouter)





app.all('*', (req:Request, res:Response, next: NextFunction) => {

    return res.status(404).json({
        message: "Error occured..."
    })

    next();

})






export default app;
