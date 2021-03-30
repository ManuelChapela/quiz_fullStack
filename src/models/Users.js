const mongoose = require('mongoose')

// Creo el esquema del modelo
const userSchema = new mongoose.Schema({                // Definir el Schema de usuarios y sacarlo por la constante userSchema
 
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String
  },
  private: {
    type: String 
  }
});

// 2. Creo el modelo y lo exporto
const User = mongoose.model('User', userSchema);      // El nombre de la constante define el primer parámetro del 

module.exports = User;                                // Exportar User (se recuperará desde user.js)
