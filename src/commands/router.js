const express = require('express');

const { slackAuthentication } = require('./middleware/authenticate');
const { attachCommand } = require('./middleware/slackCommand');
const { commandController } = require('./controllers/commandController');


module.exports = {
  createCommandRouter,
};

function createCommandRouter() {
  const router = express.Router();

  router.use(slackAuthentication);

  router.post('/', attachCommand, commandController);

  return router;
}
