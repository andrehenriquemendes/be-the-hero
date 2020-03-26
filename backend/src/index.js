const express = require('express');

// Modulo de segurança
const cors = require('cors');

const routes = require('./routes') // "./" identifica o arquivo na mesma pasta

const app = express();

app.use(cors())
app.use(express.json()); // Transforma o formato JSON em um objeto JS
app.use(routes);

app.listen(3333);