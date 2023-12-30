// Load environment variables from the .env file
require('dotenv').config();


// Handle asynchronous errors in Express
require('express-async-errors');

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Initialize Express app
const app = express();

//routers
const authRouter = require('./routes/auth.js');



// Middleware for logging requests
app.use(morgan('tiny'));

// Middleware to parse JSON in requests
app.use(express.json());

// Set Mongoose option to suppress deprecation warning
mongoose.set('strictQuery', false);



// Connect to the MongoDB database
const connectDB = require('./db/connect.js');

// Import middleware
const notFoundMiddleware = require('./middleware/not-found.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');

// Define a route for the home page
app.get('/', (req, res) => {
  res.send('e-commerce API!');
});

app.use('/api/v1/auth', authRouter);


// Use custom middleware for handling 404 errors
app.use(notFoundMiddleware);

// Use custom middleware for handling errors
app.use(errorHandlerMiddleware);

// Define the port for the server to listen on
const port = process.env.PORT || 3005;

// Define an asynchronous function to start the server
const start = async () => {
  try {
    // Connect to the MongoDB database
    await connectDB(process.env.MONGO_URL);

    // Start the Express server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

// Call the start function to initiate the server
start();
