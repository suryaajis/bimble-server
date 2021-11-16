const request = require('supertest')
const app = require('../app.js')
const { UserCourse, User, Course, Category } = require('../models')

let userToken

beforeAll( async () => {
    jest.setTimeout(90 * 1000)
    user = await User.create({
        name: "User", 
        email: "user@mail.com", 
        password: "bimblebukanbejol", 
        role: "User"
    })

    await Category.create({
        name: "Matematika"
    })

    for( let i = 0; i < 2; i++) {
        await Course.create({
            name: `Test Course ${i}`,
            description: `Matematika ilmu yang menyenangkan.....`,
            price: 5000,
            thumbnailUrl: "https://i.ytimg.com/vi/WJr11FExG7s/hqdefault.jpg?s…RUAAIhCGAE=&rs=AOn4CLAImD8rRbQR7cuFCw3Z_xsjLlr1Tg",
            difficulty: "medium",
            status: "active",
            rating: 8,
            CategoryId: 1
        })
    }

    await UserCourse.create({
        UserId: 1,
        CourseId: 1,
        isPaid: false
    })

    // login to take a access_token
    userToken = await request(app)
        .post('/public/login')
        .send({email: "user@mail.com", password: "bimblebukanbejol"})
})

afterAll( async ()=>{
    await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await Category.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await Course.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await UserCourse.destroy({ truncate: true, cascade: true, restartIdentity: true });
})

describe('POST /ovo/charge', () => {
    test('[201 - Success] Payment', (done) => {
        request(app)
        .post('/ovo/charge')
        .set(
            "access_token",
            userToken.body.access_token
        )
        .send({
            userCourseId: 1,
            phoneNumber: "+6285707124620"
        })
        .then((response) => {
            const { status, body } = response
            expect(status).toBe(200)
            expect(body).toEqual(expect.any(Object))
            expect(body).toHaveProperty('id')
            expect(body).toHaveProperty('business_id')
            expect(body).toHaveProperty('reference_id')
            expect(body).toHaveProperty('status')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })

    test('[201 - Success] Payment (Xendit)', (done) => {
        request(app)
        .post('/ovo/status')
        .set({'x-callback-token': process.env.XENDIT_VERIFICATION_TOKEN})
        .send({
            data: {
              id: 'ewc_4830d899-f1bd-4442-b632-68b8a4101470',
              status: 'SUCCEEDED',
              reference_id: 'jhon@gmail.com-1-Sat Nov 13 2021 01:20:53 GMT+0700 (GMT+07:00)'
            }
          })
        .then((response) => {
            const { status, body } = response
            expect(status).toBe(200)
            expect(body).toEqual(expect.any(Object))
            expect(body).toHaveProperty('message')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })

    test('[500 - Failed] Payment with invalid format phone number', (done) => {
        request(app)
        .post('/ovo/charge')
        .set(
            "access_token",
            userToken.body.access_token
        )
        .send({
            userCourseId: 1,
            phoneNumber: "085707124620"
        })
        .then((response) => {
            const { status, body } = response
            expect(status).toBe(500)
            expect(body).toEqual(expect.any(Object))
            expect(body).toHaveProperty('message', 'Internal server error')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })

    test('[500 - authError] Payment (Xendit) with invalid callback token', (done) => {
        request(app)
        .post('/ovo/status')
        .set({'x-callback-token': 'sdasasasasaasa'})
        .send({
            data: {
              id: 'ewc_4830d899-f1bd-4442-b632-68b8a4101470',
              status: 'SUCCEEDED',
              reference_id: 'jhon@gmail.com-1-Sat Nov 13 2021 01:20:53 GMT+0700 (GMT+07:00)'
            }
          })
        .then((response) => {
            const { status, body } = response
            expect(status).toBe(500)
            expect(body).toEqual(expect.any(Object))
            expect(body).toHaveProperty('message', 'You are not authorized')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })
})