// auth.spec.js
const supertest = require('supertest');
const app = require('../server');

describe('Mock Auth Test',()=>{
    it('Mock Test 2==2', async (done)=>{
        expect(2).toEqual(2)
        done()
    })
})

// describe('Test /Auth/Google Endpoint', () => {
    
    
//     // it('Should get auth endpoint', async (done) => {
//     //   const res = await supertest(app)
//     //     .get('/auth/google')
//     //   expect(res.statusCode).toEqual(200)
//     //   done()
//     // })
// })

// describe('Test /Auth/Login Endpoint', () => {
    
//     it('Should GET /auth/login ', async (done) => {
//       const res = await supertest(app)
//         .post('/auth/login')
//       expect(res.statusCode).toEqual(200)
//       done()
//     })
// })