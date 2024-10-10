import supertest from "supertest"
import { app } from "../../server"
import { BAD_REQUEST, CONFLICT, NOT_FOUND, OK } from "../constants/http"
import mongoose from "mongoose"
import { DB_URI } from "../constants/env"
import { activities } from "../../models/activities"

let testActivities = activities
let deleteTestActivityId = ''
const testActivityId = '6708373aa5d2e0447af339b6'
let testUserId = '6708262717cd3741a02ba923'

beforeAll(async () => {
      await mongoose.connect(DB_URI!)
      const response = await supertest(app)
      .post('/activities/')
      .send(testActivities[1])

      deleteTestActivityId = response.body._id
})


afterAll(async () => {
      await supertest(app).delete(`/activities/${deleteTestActivityId}`)
      await mongoose.connection.close()
      
})

describe('Activities routes', () => {          
      it('Should return a list of activities', async () => {
            const response = await supertest(app).get('/activities/all')
            expect(response.status).toBe(OK)
      })
      it('Should return CONFLICT if fields are missing', async () => {
            const response = await supertest(app)
            .post('/activities/')
            .send({
                  name: 'Change me',
                  description: 'Change me'
            })
            expect(response.status).toBe(CONFLICT)
      })
      // it('Should return OK if activity is created', async () => { DESCOMENTAR PARA PRUEBAS
      //       const response = await supertest(app)
      //       .post('/activities/')
      //       .send(testActivities[1])
      //       expect(response.status).toBe(OK)
      // })
      it('Should return CONFLICT if activity name already exists', async () => {
            const response = await supertest(app)
            .post('/activities/')
            .send(testActivities[1])
            expect(response.status).toBe(CONFLICT)
      })
      it('Should return a single activity by id', async () => {
            const response = await supertest(app)
            .get(`/activities/${testActivityId}`)
            
            expect(response.status).toBe(OK)
            expect(response.body).toHaveProperty("_id", testActivityId)
      })

      it('Should return BAD_REQUEST if subscriber is not valid', async () => {
            const falseID = 'idMentiroso1234'

            const response = await supertest(app)
            .patch(`/activities/subscribe/${falseID}`)
            .send({
                  name: 'Change me'
            })

            expect(response.status).toBe(BAD_REQUEST)

      })
      it('Should return NOT_FOUND if activity does not exist', async () => {
            const response = await supertest(app)
            .patch(`/activities/subscribe/${testUserId}`)
            .send({
                  name: 'Not an activity'
            }) 
            expect(response.status).toBe(NOT_FOUND)
      })
      it('Should return OK subscribing a user', async () => {
            const response = await supertest(app)
            .patch(`/activities/subscribe/${testUserId}`)
            .send({
                  name: testActivities[1].name
            })
            expect(response.status).toBe(OK)
      })
      it('Should return BAD_REQUEST if user is not Subscribed before Unsubscribe', async () => {
            const response = await supertest(app)
            .patch(`/activities/unsubscribe/${testUserId}`)
            .send({
                  name: "DO-NOT-DELETE"
            })
            expect(response.status).toBe(CONFLICT)
      })
      it('Should return OK if user is correctly unsubscribed', async () => {
            const response = await supertest(app)
            .patch(`/activities/unsubscribe/${testUserId}`)
            .send({
                  name: testActivities[1].name
            })
            expect(response.status).toBe(OK)
      })
      it("Should return OK if activity is deleted", async () => {
            const response = await supertest(app)     
            .delete(`/activities/${deleteTestActivityId}`)
            expect(response.status).toBe(OK)
      })
})