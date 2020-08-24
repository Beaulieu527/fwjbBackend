const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)
jest.useFakeTimers()

it('Testing to see if Jest works', async (done) => {
  expect(1).toBe(1)
  done()
})

it('gets the test endpoint', async done => {
  const response = await request.get('/')

  expect(response.status).toBe(200)
  expect(response.body.message).toBe("Welcome to FWJB API!")
  done()
},30000)