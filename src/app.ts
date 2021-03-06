import express, { Express, Request, Response, NextFunction } from 'express'
import path from 'path'
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { engine } from 'express-handlebars'
import rateLimit from 'express-rate-limit'
import 'express-async-errors'

// @ts-ignore
import xss from 'xss-clean'

import errorController from './errors/error.controller';
import { apiresponse } from './utils/api.response';

// INITIALIZE EXPRESS
const app: Express = express()


// MIDDLEWARE
app.set('trust proxy', true)

app.enable('view cache');

/////////// VIEW ENGINE ///////////
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: '_base',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/components')
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

/////// Rate limiter ///////////////
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    skipSuccessfulRequests: true,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);


//////////// JSON ////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

// Data sanitization against XSS
app.use(xss());

// IMPORTING ROUTERS

import { authRouter } from './routes/auth.route';
import { docRouter } from './routes/doc.route';
import AppError from './errors/AppError';


// ROUTING / APP ENDPOINTS

// Index Route || Views Route
app.get('/', (req: Request, res: Response) => {
    res.render('index', {
        title: 'Home Page'
    })
})

// API ENDPOINTS
// AUTH
app.use('/api/auth', authRouter)
// DOC
app.use('/api/doc', docRouter)

// 404 - ERROR HANDLING
// app.all('*', (req: Request, res: Response, next: NextFunction) => {
//     throw new AppError("Error occurred: Invalid Endpoint", 404)
// })

app.use((req: Request, res: Response, next: NextFunction) => {
    throw new AppError("Page Not Found", 404);
})


/////////////////////

app.use(errorController)

/////////////////////


export default app;
