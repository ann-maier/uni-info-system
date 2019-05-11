const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');

const mongoURI = require('./config/keys').mongoURI;
const usersRoutes = require('./routes/users');
const subjectsRoutes = require('./routes/subject');

mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.error(error));

const app = express();

app.use(parser.json());

app.use('/users', usersRoutes);
app.use('/subjects', subjectsRoutes);

app.listen(8080, () => console.log('Server is running on port 8080'));