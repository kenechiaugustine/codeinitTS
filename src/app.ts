import express, { Express, Request, Response, NextFunction } from 'express'
import path from 'path'
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { engine } from 'express-handlebars'
import 'express-async-errors'

// @ts-ignore
import xss from 'xss-clean'


import errorController from './errors/error.controller';
import { apiresponse } from './utils/api.response';

// INITIALIZE EXPRESS
const app: Express = express()


// MIDDLEWARE
app.set('trust proxy', true)


/////////// VIEW ENGINE ///////////
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: false
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));


/////////// STATIC FILES ///////////
app.use(express.static(path.join(__dirname, 'public')));


/////////// C O R S ///////////
app.use(cors());
//@ts-ignore
app.options('*', cors());


/////// SECURITY HTTP HEADERS ///////
app.use(helmet());


//////////// JSON ////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

// Data sanitization against XSS
app.use(xss());


// IMPORTING ROUTERS

import { authRouter } from './routes/auth.route';
import { docRouter }  from './routes/doc.route';
import AppError from './errors/AppError';


// ROUTING / APP ENDPOINTS

// Index Route || Views Route
app.all('/', (req: Request, res: Response) => {
    res.render('welcome')
})

// API ENDPOINTS
// AUTH
app.use('/api/auth', authRouter) 
// DOC
app.use('/api/doc', docRouter)

// 404 - ERROR HANDLING
app.all('*', (req:Request, res:Response, next: NextFunction) => {
    // throw new AppError(404, "Error occurred: Invalid Endpoint")
    apiresponse(404, "Error occurred: Invalid Endpoint", null, res)
    return;
})


/////////////////////

app.use(errorController)

/////////////////////


export default app;
