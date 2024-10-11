const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Users = mongoose.model(
   'Users',
   new Schema({
      nome: {
         type: String,
         required: true,
         minlength: 3,
         maxlength: 255,
      },
      email: {
         type: String,
         required: false,
      },      
      senha: {
         type: String,
         required: true,
      },      
   }, { timestamps: true })
);

module.exports = Users;
