// auth.spec.js
const supertest = require('supertest');
const app = require('../server');

describe('Test /Auth/Google Endpoint', () => {
    
    it('Should get auth endpoint', async (done) => {
      const res = await supertest(app)
        .get('/api/auth/google')
      expect(res.statusCode).toEqual(200)
      done()
    })
})

describe('Test /Auth/Login Endpoint', () => {
    
    it('Should GET /auth/login ', async (done) => {
      const res = await supertest(app)
        .get('/api/auth/login')
      expect(res.statusCode).toEqual(200)
      done()
    })
})