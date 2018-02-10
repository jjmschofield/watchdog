const express = require('express');

module.exports = {
    createCommandRouter
};

function createCommandRouter(){
  const router = express.Router();

  router.get('/', (req,res)=>{
     res.status(200).send('hi');
  });

  return router;
};