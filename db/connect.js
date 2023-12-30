const mongoose = require('mongoose');

const connectDB = (url) => {
  console.log('MongoURL from env:', process.env.MONGO_URL);

  return mongoose.connect(url)
};

module.exports = connectDB;
