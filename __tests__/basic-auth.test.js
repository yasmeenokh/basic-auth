'use strict';
require('dotenv').config();
const server = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server.app);
const mangoose = require('mongoose');
const base64 = require('base-64');

describe('POST to /signup to create a new user', ()=>{

  let newUser = {
    username: 'yasmeen',
    password: '1234',
  };
  it('Should create a new user upon signing up', async () => {
    const response = await request.post('/api/v1/signup').send(newUser);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('yasmeen');
    expect(response.body.password).toBeTruthy();
  });
});

describe('sign in with correct username and password', ()=>{

  let newUser = {
    username: 'yasmeen',
    password: '1234',
  };
  it('should sign in with correct username and password', async () => {
    const response = await request.post('/api/v1/signin').auth(newUser.username, newUser.password);
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('yasmeen');
    expect(response.body.password).toBeTruthy();
  });
  it('should not sign in with correct username and wrong password', async () => {
    const response = await request.post('/api/v1/signin').auth(newUser.username, 'aaa');
    expect(response.body.status).toEqual(500);
    expect(response.body.message).toEqual('Invalid password ');
  });
  it('should sign in with correct username and wrong password', async () => {
    const response = await request.post('/api/v1/signin');
    expect(response.status).toEqual(401);
  });
});