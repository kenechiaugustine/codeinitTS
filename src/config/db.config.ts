import mongoose from 'mongoose';

/////////////////////////////////////////////////
///////// M    O    N   G   O   D   B ///////////
/////////////////////////////////////////////////

const mongooseDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    mongoose.connect(`${process.env.DATABASE}`, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true
    });
    mongoose.connection.once('open', async () => {
      console.log(
        'Database connection was successful\n::::::::::::::::::::::::::::::::::::::::::::::'
      );
    });
  } catch (error) {
    console.error('Error 🔥: ', error);
  }
};

export default {
  DatabaseConnection: mongooseDB(),
};
