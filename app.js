require('dotenv/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Import routes
const postsRouter = require('./routes/posts');

app.use('/posts', postsRouter);

// Connect to DB
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    app.emit('Ready');
    console.log(
      'Connected to DB:',
      mongoose.connection.host,
      mongoose.connection.name
    );
  })
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to our Home!!!');
});

// How to we start listening to the server
app.on('Ready', () => {
  app.listen(process.env.PORT, () => {
    console.log(`Access:http://localhost:${process.env.PORT}`);
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
