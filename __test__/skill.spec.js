// skill.spec.js
const supertest = require('supertest');
const app = require('../server');

describe('Get Endpoints', () => {
    
    it('should get all Skills', async (done) => {
      const res = await supertest(app)
        .get('/api/skills')
      expect(res.statusCode).toEqual(200)
      done()
    })
})