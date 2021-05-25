'use strict';

/**
 * Requiring the express dependency and the clothes model class
 */
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

const basicJs = require('./middleware/basic');
const usersModel = require('../auth/models/users-model');
// const UserManager = require('../middleware/model-finder');
const User = require('./models/users-model');

/**
  * make use of the Router lib 
  */
const router = express.Router();
/**
  * Calling our routes and their function
  */
router.post('/signup', signUp );
router.post('/signin', basicJs, async(request, response)=>{
  response.status(200).json(request.user);
});


async function signUp (request, response, next){
  try {
    const complexity = 10;
    const {username, password} = request.body;
    const hashed = await bcrypt.hash(password, complexity);
    const user = new User ({username, password: hashed});
    const record = await user.save(request.body);
    response.status(201).json(record);  
  } catch (error) {
    if(error) response.status(403).json({error : error.message});
  }
}

module.exports = router;
