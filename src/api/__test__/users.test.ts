import mongoose from 'mongoose';
import { app } from '../../server'; 
import supertest from 'supertest';
import { DB_URI } from '../constants/env';
import { BAD_REQUEST, CONFLICT, NOT_FOUND, OK } from '../constants/http';


const testId = '6708262717cd3741a02ba923' // En caso de fallos, crear un usuario nuevo y reemplazar ID
const patchTestId = '670823e680b4f7217dfa4edf'// Same here
let deleteTestId = ''

beforeAll(async () => {
      await mongoose.connect(DB_URI!)
      const newEmail = 'test-me@email.com'
            const response = await supertest(app)
            .post(`/users/`)
            .send({
                  name: 'Juanito',
                  lastName: 'Perez',
                  email: newEmail,
            })
      deleteTestId = response.body.userID
      console.log(response.body)
})

afterAll(async () => {
      await supertest(app).delete(`/users/${deleteTestId}`)
      await mongoose.connection.close()
      
})

describe('It should return 200 Health Checks',  () => {
  it('should return 200 OK when users health is ok', async () => {
    const response = await supertest(app).get(`/users/health`);
    
    expect(response.status).toBe(OK);
  });

  it('should return 200 OK when activities health is ok', async () => {
    const response = await supertest(app).get(`/activities/health`);

    expect(response.status).toBe(OK);
  });
})

describe('Users routes', () => {
      it('Should return a list of users', async () => {
            const response = await supertest(app).get('/users/all')
            expect(response.status).toBe(OK)
      })
      it('Should return a single user by id', async () => {
            const response = await supertest(app)
            .get(`/users/${testId}`)
            expect(response.status).toBe(OK)
            expect(response.body).toHaveProperty("_id", testId)
      })
      it('Should return a Not Found if user id is not valid', async () => {
            const falseID = 'idMentiroso1234'
            const response = await supertest(app)
            .get(`/users/${falseID}`)
            expect(response.status).toBe(BAD_REQUEST)
      })
      it('Should return error if missing fields', async () => {
            const response = await supertest(app)
            .post(`/users/`)
            .send({
                  name: 'Juanito',
                  lastName: 'Perez',
            })
            expect(response.status).toBe(NOT_FOUND)
      })
      it('Should return CONFLICT if email is already in use', async () => {
            const emailAlreadyInUse = 'test-me@email.com'
            const response = await supertest(app)
            .post(`/users/`)
            .send({
                  name: 'Juanito',
                  lastName: 'Perez',
                  email: emailAlreadyInUse
            })
            expect(response.status).toBe(CONFLICT)
      })
      // it('Should return OK if user is created', async () => {
      //       const newEmail = 'test-me@email.com'
      //       const response = await supertest(app)
      //       .post(`/users/`)
      //       .send({
      //             name: 'Juanito',
      //             lastName: 'Perez',
      //             email: newEmail,
      //       })
      //       deleteTestId = response.body.userID
      //       expect(response.status).toBe(OK)
      //       expect(response.body).toHaveProperty("message", "User created")
      //       expect(response.body).toHaveProperty("userID")
      // })
      it('Should return NOT_FOUND if user fields are missing', async () => {
            const response = await supertest(app)
            .patch(`/users/${testId}`)
            .send({
                  name: 'Change me',
                  lastName: 'Change me'
                  //email field is missing
            })
            expect(response.status).toBe(NOT_FOUND)
      })
      it('Should return OK if user is updated', async () => {
            const response = await supertest(app)
            .patch(`/users/${patchTestId}`)
            .send({
                  name: 'Change me',
                  lastName: 'Change me',
                  email: 'change-me@email.com'
            })
            expect(response.status).toBe(OK)
      })
      it('Should return BAD_REQUEST if id is not valid', async () => {
            const falseID = 'idMentiroso1234'

            const response = await supertest(app)
            .delete(`/users/${falseID}`)

            expect(response.status).toBe(BAD_REQUEST)
      })
      it('Should return NOT_FOUND if user is not found', async () => {
            const falseID = '670823e680b4f7217dfa4ede'

            const response = await supertest(app)
            .delete(`/users/${falseID}`)

            expect(response.status).toBe(NOT_FOUND)
      })
      it('Should return OK if user is deleted', async () => {
            const response = await supertest(app)
            .delete(`/users/${deleteTestId}`)
            expect(response.status).toBe(OK)
      })
})


