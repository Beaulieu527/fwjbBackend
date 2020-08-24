// user.spec.js
const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)

// const { setupDB } = require("../test-setup");

// setupDB('endpoint-testing', true)

describe('Get Endpoints', () => {
   
    it('should get all Users', async (done) => {
        const res = await request.get('/api/users')
        expect(res.statusCode).toEqual(200)
        done()
    })
})