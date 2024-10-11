const mongoose = require('mongoose')

async function main() {
  await mongoose.connect('mongodb://mongo:3f7f1dfcac6cdaa5bc00@164.152.45.217:27017')
  console.log('Conectou com Mongoose!')
}

main().catch((err) => console.log(err))

module.exports = mongoose