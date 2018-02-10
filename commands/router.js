const express = require('express');
const {slackAuthentication} = require('./middleware/authenticate');

module.exports = {
    createCommandRouter
};

function createCommandRouter(){
  const router = express.Router();

  router.use(slackAuthentication);

  router.post('/', (req,res)=>{
      console.log(req.body);
     res.status(200).send('hi');
  });

  return router;
};