const supertest = require('supertest')
const app = require('../../app')
const request = supertest(app)
const mongoose = require('mongoose')
const User = require('../../models/user.model')


afterAll(() => {
  mongoose.connection.close();
})

it('get all evlents', async (done) => {
  const res = await request.post('/api/users/login').send({
    email: 'tomas33s@gmail.com',
    password: '987654321'
  })

  console.log(res)

  expect(res.headers['set-cookie'][0].includes('connect.sid')).toBe(true)
  

  const res2 = await request.get('/users/login').set('Cookie', res.headers['set-cookie'])

  expect(res2.status).toBe(200)
  done()
})

/*
it('Fetch all events', async (done) => {
    const res = await request.get('/api/guides')

    expect(res.status).toBe(200)
    expect(res.body.length).toBe(4)

    done()
})



it('Filter surname Jose', async(done) => {
    const res = await request.get('/api/guides?surname=Jose')

    expect(res.body.length).toBe(1)
    
    done()
})



it('Authentication OK', async (done) => {
  const res = await request.get('/api/guides').set('Authorization', 'APIKEY hkhalskduo4iweyrihebflkw5ehfeihf')

  expect(res.status).toBe(200)
  done()
})

it('Authentication KO', async (done) => {
  const res = await request.get('/api/guides')

  expect(res.status).toBe(401)
  done()
})




it('create user', async (done) => {
  const res = await request.post('/api/users').send({
    userName: 'Manuel',
    password: '987654321',
    email: 'manuel@manuel.com',
  })

  expect(res.status).toBe(201)

  

  const id = res.body.id
  const res2 = await request.get(`/api/users/${id}`)

  expect(res2.status).toBe(200)
  expect(res2.body.userName).toBe('Manuel')
  expect(res2.body.password).toBe(undefined)

  const userSaved = await User.findById(id)

  expect(userSaved.password.length).toBeGreaterThan(5)
  expect(userSaved.password).not.toBe('123456788')



 const res3 = await request.patch(`/api/users/${id}`).send({
   userName: 'Manuel'
 })

 expect(res.status).toBe(201)
 expect(res3.body.userName).toBe('Manuel')

 done()
 })
 

/*const res4 = await request.delete(`/api/users/${id}`)
  expect(res4.status).toBe(204)

  done()


it('login', async (done) => {
  const res =  await request.post('/api/users/login').send({
    email:'moises@moises.com',
    password: '123212321'
  })
 
 expect(res.headers['set-cookie'][0].includes('connect.sid')).toBe(true)
 done()
 
})

it('create user, missing parameter', async (done) => {
  const res3 = await request.post('/api/users').send({
    password: '123456789A',
    email: 'manuel2@gmail.com',
  })

  expect(res3.status).toBe(400)
  done()
})


*/
