// EN ESTE ARCHIVO SE INSTALAN LAS DEPENDENCIAS Y SE PIDEN TODOS LOS DIFERENTES ARCHIVOS QUE NECESITAMOS PARA ACABAR HACIENDO EL SERVER.USE("/USERS", USERSROUTES) --> Que va a ser el main query e irá a continuación por los definidos en users.js [/registro]

const listenPort = 4000;
const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('./src/config/db');                            // Está exportada desde esa ruta
const usersRoutes = require('./src/routes/users');                      // ASK ---> los endpoints llevan .js?
const server = express();




// Middleware para parsear el body de la respuesta
server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use('/users', usersRoutes);                                       // principal: users/registro


server.listen (listenPort,
        console.log(`Server started listening on ${listenPort}`));
