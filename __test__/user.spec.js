// user.spec.js
const supertest = require('supertest');
const app = require('../server')

describe('Get Endpoints', () => {

    it('should get all Users', async (done) => {
        const res = await supertest(app)
        .get('/api/users')
        expect(res.statusCode).toEqual(200)
        done()
    })
})