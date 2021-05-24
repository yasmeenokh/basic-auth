'use strict';
/**
 * adding dependencies
 */
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

/**
 * Requiring the error handlers and the middleware
 */
const errorHandlers = require('./middleware/500');
const notFoundHandler = require('./middleware/404');

const router = require('./auth/router');
/**
 * Make use of the morgan cors logger dependencies 
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use('/api/v1', router );


/**
 * This function is used to call the home Route
 * @param {request} send request
 * @param {response} send response
 * @returns {response} console massage 
 */
app.get('/', (request, response)=>{
  response.send('Welcome To The SERVER.JS');
});

/**
 * This function is used to call the home Route
 * @param {request} send request
 * @param {response} send response
 * @returns {response} error massage 
 */
app.get('/bad', (request, response)=>{
  throw new Error('SOMETHING WENT WRONG');
});
    
/**
     * Make use of the error handlers
     */
app.use(errorHandlers);
app.use('*', notFoundHandler);
/**
     * This function is used to start listening to app on PORT
     * @param {PORT} the port to listen with
     */
function start (PORT){
  app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
  });
}

/**
   * @typedef {exports(app, start} 
   */
module.exports= {
  app : app, 
  start : start,
};
  



