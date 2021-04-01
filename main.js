// EN ESTE ARCHIVO SE INSTALAN LAS DEPENDENCIAS Y SE PIDEN TODOS LOS DIFERENTES ARCHIVOS QUE NECESITAMOS PARA ACABAR HACIENDO EL SERVER.USE("/USERS", USERSROUTES) --> Que va a ser el main query e irá a continuación por los definidos en users.js [/registro]

const listenPort = 4000;
const express = require('express');
const dotenv = require('dotenv').config();
// const usersRoutes = require('./src/routes/users');                      // ASK ---> los endpoints llevan .js?
const server = express();
// const { User } = require('./src/models/Users'); 
// const { Quest } = require('./src/models/Users'); 
const mongoose = require('mongoose')


// Apuntar al front (tiene que ir siempre)
const staticFilesPath = express.static(__dirname + '/public');
server.use(staticFilesPath);

// Middleware para parsear el body de la respuesta
server.use(express.json());
server.use(express.urlencoded({extended: false}));

// server.use('/users', usersRoutes);  // principal: users/registro

server.listen (listenPort,
        console.log(`Server started listening on ${listenPort}`));


//////////////////////////// CONEXIÓN DATABASE (db.js) ////////////////////////////
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



//////////////////////////// ESQUEMAS (Users.js) ////////////////////////////
const { Schema } = mongoose;

const questionSchema = new Schema({               
        
        pregunta: {
          type: String,
          required: true,
          unique: true,
        },
        respuesta: {
         type:[String],
         required: true,
         unique: true
        },
        correcta: {
          type: Number,
          required: true,
        }
        });
    
    const userSchema = new Schema({
      user: {
        type: String,
        required: true},
      password: {
        type: String,
        required: true},
    })
    
// Creo el modelo y lo exporto
const User = mongoose.model('user', userSchema, 'user');    
const Quest = mongoose.model('questions', questionSchema, 'questions');




//////////////////////////// HACER LOG IN ////////////////////////////
server.post('/login', (req, res)=>{
        const USER = {
                user : req.body.email,
                password: req.body.password
        }
        try {
                User.findOne(USER, (err, result)=>{   // Nos busca el campo { email } y se introducen los cambios como un objeto {token, private: secret}
                if (result == null) {
                        res.status(400).json({
                                status:400,
                                data: "No match",
                                ok: false
                        })
                }
                else {
                        res.status(200).json({
                                status:200,
                                data: result,
                                alert: "Login correctly",
                                ok: true
                        })
                }
        })
}
catch {
        console.log("Error con la base de datos");
}
})



//////////////////////////// LEER LAS QUESTIONS DE LA DB ////////////////////////////
server.get('/readQuestions', (req, res) => {
       
        try{
                Quest.find({}, (err, result) => {
                        if(result == null){
                                res.status(400).json({
                                        status: 400,
                                        ok: false,
                                        data: "No se ha encontrado ninguna pregunta para mostrar"
                                })
                        }else{
                                res.status(200).json({
                                        status: 200,
                                        ok: true,
                                        data: result
                                })
                        }
                })
        }
        catch{
                console.log("Error en la base de datos")
        }
})




//////////////////////////// GUARDAR LAS QUESTIONS EN LA DB ////////////////////////////
server.post('/saveQuestions', (req, res) => {
        const writeAnswers = {
                pregunta: req.body.pregunta,
                respuesta: req.body.respuesta,
                correcta: req.body.correcta
        }
        try{
                Quest.create( writeAnswers, (err, result) => {
                        console.log("2", err);
                        if(err) {
                                res.status(400).json({
                                        status: 400,
                                        ok: false,
                                        data: "Algo va mal, no se puede crear esa pregunta"
                                })
                        }else{
                                res.status(200).json({
                                        status:200,
                                        ok: true,
                                        data: "Pregunta guardada",
                                        url: "admin.html"
                                })
                        }
                })
        }catch{
                console.log("Error en la base de datos")
        }
})




//////////////////////////// EDITAR LAS QUESTIONS EN LA DB ////////////////////////////

server.put('/editQuestion', (req, res) => {

        const writeAnswers = {
                pregunta: req.body.pregunta,
                respuesta: req.body.respuesta,
                correcta: req.body.correcta
        }
        console.log(writeAnswers)
        try{
                Quest.updateOne({_id: req.body._id}, writeAnswers, (err, result) => {
                        if(err) {
                                res.status(400).json({
                                        status: 400,
                                        ok: false,
                                        data: "No se han encontrado preguntas para mostrar"
                                })
                        }else{
                                res.status(200).json({
                                        status:200,
                                        ok: true,
                                        data: "Pregunta guardada",
                                        url: "admin.html"

                                })
                        }
                })
        }catch{
                console.log("Error en la base de datos")
        }
})



//////////////////////////// BORRAR LAS QUESTIONS EN LA DB ////////////////////////////

server.delete('/deleteQuestion', (req, res) => {
        try{
                Quest.deleteOne({pregunta: req.body.pregunta}, (err, result) => {
                        if(err) {
                                res.status(400).json({
                                        status: 400,
                                        ok: false,
                                        data: "No se han encontrado preguntas para borrar"
                                })
                        }else{
                                res.status(200).json({
                                        status:200,
                                        ok: true,
                                        data: "Pregunta borrada con éxito",
                                        url: "admin.html"
                                })
                        }
                })
        }catch{
                console.log("Error en la base de datos")
        }
})