const express = require('express');
const logger = require('morgan');
require('./utils/db');
const createUser = require('./routes/userTodo');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(logger());
app.use("/api", createUser);

app.listen(PORT,()=>{console.log(`Listening to PORT ${PORT}`)});
