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

import { authRouter } from './routes/auth.route';

import { docRouter }  from './routes/doc.route'


// ROUTING / APP ENDPOINTS

// Index Route || Views Route
app.all('/', (req: Request, res: Response) => {
    return res.sendFile(__dirname + '/views/welcome.html')
})


// API ENDPOINTS
// AUTH
app.use('/api/auth', authRouter)


// DOC
app.use('/api/doc', docRouter)



app.all('*', (req:Request, res:Response, next: NextFunction) => {

    return res.status(404).json({
        message: "Error occured..."
    })

    next();

})






export default app;
