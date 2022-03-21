import express, { Application, Express, Request, Response, NextFunction } from 'express'
import helmet from 'helmet';
import cors from 'cors';




const app: Express = express()



app.set('trust proxy', true)

app.use(cors());

app.use(helmet());

app.use(express.json());




app.get('/', (req:Request, res:Response, next: NextFunction) => {
    res.send('Hello');
})



app.all('*', (res: Response) => {
    res.send('Error occured...')
})




export default app;
