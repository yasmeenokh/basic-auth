'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const usersModel = require('../models/users-model');

async function signIn (request, response, next){
  try {
    console.log('888888888', request.headers.authorization);
    const encoded = request.headers.authorization.split(' ')[1];
    const decoded = base64.decode(encoded);
    const [username, password] = decoded.split(':');
    const user = await usersModel.findOne(request.body);
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