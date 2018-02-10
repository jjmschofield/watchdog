const express = require('express');

module.exports = {
    createCommandRouter
};

function createCommandRouter(){
  const router = express.Router();

  router.post('/', (req,res)=>{
     res.status(200).send('hi');
  });

  return router;
};