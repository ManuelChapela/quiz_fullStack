const { ObjectId } = require('bson');
const mongoose = require('mongoose')

// Creo el esquema del modelo
const questionSchema = new mongoose.Schema({                // Definir el Schema de usuarios y sacarlo por la constante userSchema
    id:{
      type: ObjectId,//mongoose.Schema.Types.ObjectId,
      required: true
    },
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

const userSchema = new mongoose.Schema({
  type: {
    type: String
  },
  user: {
    type: String,
    required: true},
  password: {
    type: String,
    required: true},
  token: {
    type: String
  }
})

// 2. Creo el modelo y lo exporto
const User = mongoose.model('user', userSchema);      // El nombre de la constante define el primer parámetro del 
const Quest = mongoose.model('questions', questionSchema); 

module.exports = { User: User, Quest: Quest}                           // Exportar User (se recuperará desde user.js)
