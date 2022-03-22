import dotenv from 'dotenv'
dotenv.config({ path: './.env' })


import DatabaseConnection from './utils/db.config' 
// DatabaseConnection


import app from './app'

const PORT = process.env.PORT || 3001




// Server Start

app.listen(PORT, () => console.log(`Application started on port: ${PORT}...`));
