const express = require('express');

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')


const routes = express.Router();

routes.post('/sessions', SessionController.create);

/* -- Listagem de ONGs -- */
routes.get('/ongs', OngController.index);
/* -- Cadastro de ONG -- */
routes.post('/ongs', OngController.create);

/* -- Listagem de Incidents -- */
routes.get('/incidents', IncidentController.index);
/* -- Cadastro de Incident -- */
routes.post('/incidents', IncidentController.create);
/* -- Deletar um Incident -- */
routes.delete('/incidents/:id', IncidentController.delete);

/* -- Listar Incidents de uma ONG especifica -- */
routes.get('/profile', ProfileController.index);

module.exports = routes;