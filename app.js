const express = require("express");
const cors = require('cors');
require('dotenv').config();
require('./database');
const app = express();

// Configuracion
const port = process.env.PORT;

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/search', require('./routes/search'));

app.listen(port, () => console.log(`App running in port: ${port}`));
