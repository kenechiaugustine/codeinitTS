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




// ROUTING / APP ENDPOINT

app.get('/hello', (req:Request, res:Response, next: NextFunction) => {
    res.status(200).json({

        data: null,
        message: "Hi mom"

    });
})

// app.use('/user', user-route)




app.all('*', (res: Response) => {
    res.send('Error occured...')
})






export default app;
