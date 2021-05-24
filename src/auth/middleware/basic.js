'use strict';

// const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
// const mongoose = require('mongoose');

// const UserManager = require('../../middleware/model-finder');
const usersModel = require('../models/users-model');

async function signIn (request, response, next){
  try {
    console.log('888888888', request.headers.authorization);
    const encoded = request.headers.authorization.split(' ')[1];
    const decoded = base64.decode(encoded);
    const [username, password] = decoded.split(':');
    const user = await usersModel.findOne(request.body);
    //   const isValid = await bcrypt.compare(password, user.password);
    //   if(isValid){
    //     response.json(user);
    //   } else {
    //     response.status(401).json({error: 'Invalid password or username'});
    //   }
    // } catch (error) {
    //   next(error);
    // }
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        request.user = user;
        next();
      } else {
        next({ message: 'Invalid password ', status: '401' });
      }
    } else {
      next({ message: 'Invalid  username', status: '401' });
    }
  } catch (error) {
    response.status(401).json({ error: error.message });
  }
}

module.exports = signIn;