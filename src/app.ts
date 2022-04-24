import express, { Express, Request, Response, NextFunction } from 'express'
import path from 'path'
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { engine } from 'express-handlebars'
// @ts-ignore
import xss from 'xss-clean'


// INITIALIZE EXPRESS
const app: Express = express()


// MIDDLEWARE
app.set('trust proxy', true)


console.log(`File path::::::::::::::::\n ${path.join(__dirname,'/views/layouts/_base.hbs')}`)
console.log(`Main File path::::::::::::::::\n ${__dirname}`)

// LOCAL FILE MAIN PATH ====  C:\Workspace\Web dev\codeinitTS\dist
// HEROKU FILE MAIN PATH ==== /app/dist

/////////// VIEW ENGINE ///////////
app.engine('.hbs', engine({
    extname: '.hbs',
    // defaultLayout: `_base`,
    defaultLayout: path.join(__dirname,`/views/layouts/_base.hbs`),
    // defaultLayout: '_base.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));


/////////// STATIC FILES ///////////
app.use(express.static(path.join(__dirname, 'public')));


/////////// C O R S ///////////
app.use(cors());
// @ts-ignore
app.options('*', cors());




/////// SECURITY HTTP HEADERS ///////
app.use(helmet());


app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

// Data sanitization against XSS
app.use(xss());




// IMPORTING ROUTERS

import { authRouter } from './routes/auth.route';

import { docRouter }  from './routes/doc.route';


// ROUTING / APP ENDPOINTS

// Index Route || Views Route
app.all('/', (req: Request, res: Response) => {
    // return res.sendFile(__dirname + '/views/welcome.html')
    res.render('welcome')
})


// API ENDPOINTS
// AUTH
app.use('/api/auth', authRouter)


// DOC
app.use('/api/doc', docRouter)



app.all('*', (req:Request, res:Response, next: NextFunction) => {

    return res.status(404).json({
        message: "Error occurred: Invalid Endpoint"
    })

    next();

})






export default app;
