import mongoose from "mongoose";


/////////////////////////////////////////////////
///////// M    O    N   G   O   D   B ///////////
/////////////////////////////////////////////////


const mongooseDB = async () => {
    try {
        mongoose.connect(`${process.env.DATABASE}`, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
        });
        mongoose.connection.once('open', async () =>  {
            console.log('Database connection was successful\n::::::::::::::::::::::::::::::::::::::::::::::')
        })
    } catch (error) {
        console.error('Error 🔥: ', error)
    }

}








/////////////////////////////////////////////////
///////////// M    Y       S   Q   L ////////////
/////////////////////////////////////////////////

// coming soon...







const DatabaseConnection = mongooseDB()


export default DatabaseConnection 