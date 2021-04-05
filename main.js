
//////////////////////////// CONEXIONES ( express / dotenv / server / mongoose ) ////////////////////////////
const listenPort = 4000;
const express = require('express');
const dotenv = require('dotenv').config();
const server = express();
const mongoose = require('mongoose')


//////////////////////////// APUNTAR AL FRONT ////////////////////////////
const staticFilesPath = express.static(__dirname + '/public');
server.use(staticFilesPath);


//////////////////////////// DEPENDENCIAS ( randomString / md5 / jsonwebtoken ) ////////////////////////////
const jwt = require('jsonwebtoken')
const md5 = require('md5')
const randomstring = require('randomstring')
const secret = randomstring.generate(7)


//////////////////////////// MIDDLEWARE ( para parsear el body de la respuesta ) ////////////////////////////
server.use(express.json());
server.use(express.urlencoded({extended: false}));


//////////////////////////// PUERTO QUE ESCUCHA ////////////////////////////
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


//////////////////////////// VALIDAR MAIL Y CONTRASEÑA ////////////////////////////
function validateEmail(email) {
        let patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return patternEmail.test(email);  
     }
function validatePass(pass) {
        let patternPass = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        return patternPass.test(pass);  
}


//////////////////////////// HACER LOG IN ////////////////////////////
server.post('/login', (req, res)=>{
        
        // create token

        const USER = {
                user: req.body.email,
                password: req.body.password
                // token: 
        }
        try {
                if(validatePass(req.body.password)&&validateEmail(req.body.email)){
                        
                        User.findOne(USER, (err, result)=>{   
                                
                                if (result == null) {
                                        res.status(400).json({
                                                status:400,
                                                data: "Su email o contraseña no coinciden con el de nuestra base de datos",
                                                ok: false
                                        })
                                }
                                else {
                                        res.status(200).json({
                                                status:200,
                                                data: result,
                                                alert: "Login correctly",
                                                ok: true,
                                                url: "admin.html"
                                                // token: token
                                        })
                                }
                        })
                        
                }else if (validatePass(req.body.password)){
                        res.status(401).json({
                                alert: "No has introducido un email válido, vuelve a intentarlo",
                                status: 401,
                                ok: false,
                                url: "login.html"
                        })
                }else if (validateEmail(req.body.email)){
                        res.status(402).json({
                                alert: "No has introducido una contraseña válida, vuelve a intentarlo",
                                status: 402,
                                ok: false,
                                url: "login.html"
                        })
                }
        }catch {
                console.log("Error con la base de datos");
        }
        
})




//////////////////////////// HACER LOG OUT ////////////////////////////    [UNDERCONSTRUCTION]

server.put('/logout', (req, res) => {
        console.log(req.headers);
        let tokenRaw = req.headers['Content-Type']?.split(":")   
        if(tokenRaw){
                let tokenDecode = jwt.decode(tokenRaw[1])
                let verify = jwt.verify(tokenRaw[1], result[0].private)                 // verificamos que la palabra secreta sea la misma que la palabra secreta del sign in
                        console.log("1", jwt.verify(tokenRaw[1], result[0].private));
                        console.log("2", tokenRaw[1]);
                        console.log("3", result[0].private);
                        console.log("4", result.private);
                        console.log("5", result);
                if (verify) {                                                           // Si existe
                        User.find({ email: tokenDecode.email }, (err,result) => {
                                if(result.length == 0){
                                res.status(200).json({
                                        status: 200,
                                        data: "Te has deslogado correctamente",
                                        url: 'index.html' 
                                });
                                }else{
                
                        res.status(400).json({
                                status: 400,
                                data: "Algo va mal... La sesión ha caducado",
                                ok: false,
                                url:'index.html'
                        }
                        
                        )}

})}
        }
        else{
                res.status(401).json({
                        status: 401,
                        data: "Che, mandame un token de verdad",
                        url: 'index.html'

                })
                console.log("Valor no válido");}
})




//////////////////////////// LEER LAS PREGUNTAS DE BACKEND ( primera parte ejercicio )////////////////////////////
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















/////// PRIMERA PARTE EJERCICIO //////


//////////////////////////// LEER LAS PREGUNTAS BACKEND ////////////////////////////
server.get('/guestReadQuestions', (req, res) => {
       
        try{
                Quest.find({}, (err, result) => {
                        if(result == null){
                                res.status(400).json({
                                        status: 400,
                                        ok: false,
                                        data: "No se ha encontrado ninguna pregunta para mostrar en la base de datos"
                                })
                        }else{
                                res.status(200).json({
                                        status: 200,
                                        ok: true,
                                        results: result
                                })
                        }
                })
        }
        catch{
                console.log("Error en la base de datos")
        }
})