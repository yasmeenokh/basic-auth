'use strict'; 
/**
 * @typedef {exports(request, response)} 
 */
module.exports = (request, response)=>{
  response.status(404).json({
    status : 404,
    message : 'Page Can Not Be Found',
  });

};