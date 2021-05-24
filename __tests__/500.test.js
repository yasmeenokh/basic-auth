'use strict';
const server = require('../src/server');
const superTest = require('supertest');
const request = superTest(server.app);

describe('api server', ()=>{
  it('should give 404 status', async ()=>{
    const response = await request.get('/foo');
    expect(response.status).toBe(404);
  });
  it('should give 404 status', async ()=>{
    const response = await request.post('/');
    expect(response.status).toBe(404);
  });
  it ('should give 500 error', async ()=>{
    const response = await request.get('/bad');
    expect (response.status).toBe(500);
  });
    
});
  