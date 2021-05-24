'use strict'; 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const basicJs = require('../auth/middleware/basic');

/**
 * UserManager is an example class for my DataManager constructor.
 * @class
 * @constructor
 * @public
 */

class UserManager {
  constructor(model){
    this.model = model;
  }
  /**
       * create is an example property that sets the obj
       * @type {number}
       * @type {obj}
       * @returns {obj}
       */
  create (obj) {
    const dataElement = new this.model(obj);
    return dataElement.save();
  }
  /**
       * create is an example property that sets the obj from db
       * @type {number}
       * @returns {Array}
       */
  async read (obj){
    try {
      const user = await this.model.findOne({username : obj.username});
      const isValid = await bcrypt.compare(obj.password, obj.password);
      if(isValid){
        return user;
      } else {
        return status(401).json({error: 'Invalid password or username'});
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = UserManager;
