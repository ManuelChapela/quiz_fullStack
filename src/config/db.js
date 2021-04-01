const mongoose = require('mongoose')

// create a post method to 

const urlDatabase = 'mongodb://localhost:27017/quiz_fullStack';      // Nombre de la database. El archivo DB va a ser el punto de conexion con la base de datos.
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }

mongoose
  .connect(urlDatabase, mongoOptions)
        .then(() => {
            console.info('Connected to DB!');
        })
        .catch((err) => console.error(err))

process.on('SIGINT', () => {                                        // Cuando estás conectado, nos salta este mensaje.
  mongoose.connection.close(() => {
    console.info('> mongoose succesfully disconnected!');
    process.exit(0);
  });
});

module.exports = mongoose;                                          // Para que otro fichero pueda tirar de este fichero. Es obligatorio. 