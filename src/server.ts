import dotenv from 'dotenv'
dotenv.config({ path: './.env' })


import DatabaseConnection from './utils/db.config' 
// DatabaseConnection


import app from './app'




// Server Start

app.listen(process.env.PORT || 3001, () => console.log(`Application started...`));
