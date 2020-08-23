// skill.spec.js
const supertest = require('supertest');
const app = require('../server');

describe('Tests /Skills Endpoints', () => {
    
    it('should GET all Skills', async (done) => {
      const res = await supertest(app)
        .get('/api/skills')
      expect(res.statusCode).toEqual(200)
      done()
    })
})