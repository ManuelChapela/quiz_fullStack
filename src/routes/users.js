const { create, validate } = require('../models/Users')
const User = require('../models/Users')                              // Hacemos referencia al documento Users que es donde definimos el PoemaSchema
const server = require('express').Router()
const md5 = require('md5')

// Create dependencies jwt
const jwt = require('jsonwebtoken')                                                      // npm i jsonwebtoken
// const privateKey = "mogambo"

const randomstring = require('randomstring')
const secret = randomstring.generate(7)





// ---------------- Función validación.


function isEmailAddress(email, pass) {
    let patternEmail =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let patternPass = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
            console.log(patternEmail.test(email)&&patternPass.test(pass))
    return patternEmail.test(email)&&patternPass.test(pass);  
 }

// Creamos nuevo usuario (SING UP)
server.post('/registro', (req,res) => {

    if(isEmailAddress(req.body.email, req.body.password)){    
    // Validar que el email y la contraseña sean validos por regexp
    
    User.find( {email: req.body.email}, (err,data) => {
        if(err){
            throw err
        }else if(data.length === 0){
            
            const passHash = md5(req.body.password)
            
            User.create({
                email: req.body.email,
                password: passHash,
                token: "",
                private: ""
            })
            res.send({"success": true, 
            "mensaje": "Usuario creado con éxito"})
        } else {
            res.send({"success": false, 
            "mensaje": "El email ya está en uso"})
        }
    
    })    
    }else{
         res.send('Introduce un email válido y una contraseña válida')
}
    // Si el email y la contraseña ya existen: mensaje de "Ya existen"
})
// -------------------------------------------------------------------

server.post('/login', (req, res)=>{
    const {email} = req.body;                       // Destructuring
    const password = md5(req.body.password);
    //aqui tenemos datos 
    //comprobar los dos datos email y password con la base de datos
    
    let token = jwt.sign({email, password}, secret, {expiresIn: 60*60});

    User.updateOne({email}, {token, private: secret}, (err, result)=>{   // Nos busca el campo { email } y se introducen los cambios como un objeto {token, private: secret}

            console.log("1", result);
            console.log("2", result.nModified);

        if(result.nModified === 1){       // result es el resultado del User.updateOne y va a traernos un objeto {n:1, nModified: 1, ok: 1}

            res.status(200).json(         // Nos envía un json a front con un success / message y el token
                {
                    'success': true, 
                    'message': 'Bienvenido a la página',
                    token
                })
            
                //si existe creamos token que almancenamos en la base de datos y lo devolvemos en res.send
            } else{
            res.redirect('/registro');      // Si el usuario no existe, nos redirige a LogIn
            }
    })});

// Vamos a hacer un logOut entonces tendremos que buscar si front tiene un token (en este caso se enviará por headers: KEY= "autentication" VALUE="token (copiado y pegado a mano)". Con esa const anterior, decodear el token, haciendo un split(" "). Con esta const hacer un .delete() a la base de datos de token y prvateRandomKey. Redireccionar

server.post('/logout', (req, res) => {
    // try{
        let tokenRaw = req.headers.authorization.split(":")
        console.log(tokenRaw)   
        
        let tokenDecode = jwt.decode(tokenRaw[1])
        console.log(tokenDecode); 
        // console.log(tokenDecode.email); 


        // if(tokenDecode.email){

            User.find({ email: tokenDecode.email}, (err,result) => {
            
                console.log("1", result);
                console.log("2", result[0].private);
                try {
                let verify = jwt.verify(tokenRaw[1], result[0].private)               // verificamos que la palabra secreta sea la misma que la palabra secreta del sign in
                console.log("3", verify);

                    if (verify) {
                            User.updateOne( {email:verify.email}, {token:"", private: ""}, (err, result)=>{  
                                
                            console.log("4", {email:verify.email});
                            // ASK es res o result de donde viene?
                        res.redirect( 200, '/login' );
                    })
                }
            }
                catch(err) {
                    res.status(401).json({
                        data: "Algo va mal... La sesión ha caducado",
                        ok: false,
                    })
                    // console.log(err);
                }
        

    }
)})






// ------------ Private

server.get('/private', (req, res) => {
    let tokenRaw = req.headers.authorization.split(":")
    let tokenDecode = jwt.decode(tokenRaw[1])
        User.find({ email: tokenDecode.email}, (err,result) => {
            try {
                let verify = jwt.verify(tokenRaw[1], result[0].private)
                if (verify) {
                    res.send( 'Bienvenido a tu zona de confort' );
                }}catch{
                    res.redirect(200, '/login')
                }
})})




module.exports = server;


// VALIDACION
// PONERLE TIEMPO A LA EXPIRESIN TOKEN


/*
Una vez sepas testear e2e con Cypress, lo siguiente es que te hagas el front necesario para engancharlo con el back que hiciste para los 3 ejercicios de sign-up, sign-in y logout, realizando los siguientes pasos:

// Hacer 3 sencillísimas vistas front (solo HTML, sin CSS) para cada uno de los 3 casos de uso, esto es:
        - Un miniform email/pass/submit para el /register
        - Un miniform email/pass/submit para el /login
        - Una para /home que tenga un "Bienvenido" 

Testear estas 3 vistas con Cypress, simulando el back, comprobando que funcionan.
Juntar ambos y comprobar que front y back hablan entre sí.

Nota: El login redirigirá a una zona privada ( /home ) al submitear, previo login con JWT.

*/
    
    
    
    
    
    
    




































    //si no existe mensaje, redireccionamos a un nuevo registro
    // let result = jwt.verify(token, privateKey);
    // console.log(result);
    //Consultar si exite mail(busco con find lo que me llegue por el campo mail)
    //Si existe enviar mensaje de error que ya existe
    //Si no insertar en la base de datos y enviar mensaje de exito



/*
server.post('/log-in', (req,res) => {
    // Comprobar que existe un usuario con nuestro mismo mail y contraseña
        // Si existe:
                // 
        // No existe: mensaje de error

}


*/






    /*
    1- Consultar si existe email [find que filtre por email]
        1.1. Existe: enviar mensaje error
        1.2. NoExiste: Paso 2
    2. Insertar en DB
        2.1. Mensaje: creado correctamente
    */










// Verificamos su identidad (SING IN) 

/*
Enviar petición post /logIn y se envían las credenciales
Llegan al serven. Crea un JWT ----> 
    [ encoded: string empaquetado  //// decoded: object ] 
    [ 3 partes: 
            header: { alg, type }
            pauload: { data }
            signature: { hash(string) }    /// hashing-> cifrado --> md5/hs256
    ]
    [PARA ENTENDERLO --> chaval quiere entrar en la discote con un QR. En la puerta: enseñame tus credenciales. Comprueban la lista y le ponen un sello. ]


    Cuando creamos las tres partes las enviamos desde res.send y lo almacenamos en localstorage, cookies[ cookieParser ]
*/








/* 
VALIDATION
regexone.com // regexr.com
*/