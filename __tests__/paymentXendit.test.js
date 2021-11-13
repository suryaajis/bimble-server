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

    // test('[201 - Success] Payment (Xendit)', (done) => {
    //     request(app)
    //     .post('/ovo/status')
    //     .set(
    //         {
    //             host: '9781-139-195-146-28.ngrok.io',       
    //             'user-agent': 'axios/0.21.1',
    //             'content-length': '764',
    //             accept: 'application/json, text/plain, */*',
    //             'content-type': 'application/json',
    //             'x-callback-token': 'Gu1gqIxKXy6i7AGDCQgiSLdw4PeNNI2yi7P0aamoFvmiLWlM',
    //             'x-datadog-parent-id': '7549655668905774975',
    //             'x-datadog-sampled': '1',
    //             'x-datadog-sampling-priority': '1',
    //             'x-datadog-trace-id': '1439975027950009750',
    //             'x-forwarded-for': '52.89.130.89',
    //             'x-forwarded-proto': 'http',
    //             'accept-encoding': 'gzip'
    //           }
    //     )
    //     .send({
    //         data: {
    //           id: 'ewc_4830d899-f1bd-4442-b632-68b8a4101470',
    //           basket: null,
    //           status: 'SUCCEEDED',
    //           actions: null,
    //           created: '2021-11-12T18:20:56.434Z',
    //           updated: '2021-11-12T18:20:56.443Z',
    //           currency: 'IDR',
    //           metadata: null,
    //           voided_at: null,
    //           capture_now: true,
    //           customer_id: null,
    //           callback_url: 'http://9781-139-195-146-28.ngrok.io/ovo/status',
    //           channel_code: 'ID_OVO',
    //           failure_code: null,
    //           reference_id: 'jhon@gmail.com-1-Sat Nov 13 2021 01:20:53 GMT+0700 (GMT+07:00)',
    //           charge_amount: 5000,
    //           capture_amount: 5000,
    //           checkout_method: 'ONE_TIME_PAYMENT',
    //           payment_method_id: null,
    //           channel_properties: { mobile_number: '085707124620' },
    //           is_redirect_required: false
    //         },
    //         event: 'ewallet.capture',
    //         created: '2021-11-12T18:20:56.448Z',
    //         business_id: '618e2ab43dc2412b8a2c640f'
    //       })
    //     .then((response) => {
    //         const { status, body } = response
    //         expect(status).toBe(200)
    //         expect(body).toEqual(expect.any(Object))
    //         expect(body).toHaveProperty('message')
    //         done()
    //     })
    //     .catch((err) => {
    //         done(err)
    //     })
    // })
})