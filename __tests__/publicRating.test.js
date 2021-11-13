const request = require('supertest')
const app = require('../app.js')
const { UserCourse, User, Course, Category } = require('../models')

let userToken

beforeAll( async () => {
    jest.setTimeout(90 * 1000)
    user = await User.create({
        name: "Jhon", 
        email: "jhon@gmail.com", 
        password: "12345678", 
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
        isPaid: true
    })

    await UserCourse.create({
        UserId: 1,
        CourseId: 2,
        isPaid: false
    })

    // login to take a access_token
    userToken = await request(app)
        .post('/public/login')
        .send({email: "jhon@gmail.com", password: "12345678"})
})

afterAll( async ()=>{
    await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await Category.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await Course.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await UserCourse.destroy({ truncate: true, cascade: true, restartIdentity: true });
})

describe('POST /public/ratings/:courseId', () => {
    test('[201 - Success] add Rating', (done) => {
        request(app)
        .post('/public/ratings/1')
        .set(
            "access_token",
            userToken.body.access_token
        )
        .send({
            rating: 8,
        })
        .then((response) => {
            const { status, body } = response
            expect(status).toBe(201)
            expect(body).toEqual(expect.any(Object))
            expect(body).toHaveProperty('rating')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })

    test('[400 - CourseNotPaid] Add Rating before purchase course', (done) => {
        request(app)
        .post('/public/ratings/2')
        .set(
            "access_token",
            userToken.body.access_token
        )
        .send({
            rating: 8,
        })
        .then((response) => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toEqual(expect.any(Object))
            expect(body).toHaveProperty('message', 'You must buy first')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })

    test('[400 - Maximal rating is 10] add a rating with a value that exceeds the maximum', (done) => {
        request(app)
        .post('/public/ratings/1')
        .set(
            "access_token",
            userToken.body.access_token
        )
        .send({
            rating: 11,
        })
        .then((response) => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toEqual(expect.any(Object))
            expect(body).toHaveProperty('message', 'Maximal rating is 10')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })
})