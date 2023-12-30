require('dotenv').config()
const mongoose = require('mongoose'); 

const express = require('express')
const app = express()
// Set Mongoose option to suppress deprecation warning
mongoose.set('strictQuery', false);
console.log(process.env)

//Database
const connectDB = require('./db/connect.js')

const port = process.env.PORT || 3005
const start = async ()=> {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, ()=> {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
console.log(error)  }
}
start()
