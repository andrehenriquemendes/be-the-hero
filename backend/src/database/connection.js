// Conecta o banco de dados com a aplicação

const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;