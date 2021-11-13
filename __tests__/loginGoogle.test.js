const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true })
});

describe("[201 - Success] POST /public/googleLogin", () => {
    test("[201 - Success] Login Google", (done) => {
        request(app)
        .post("/public/googleLogin")
        .send({
            idToken: process.env.TEST_GOOGLE_ID_TOKEN
        })
        .then((response) => {
            const { status, body } = response;
            expect(status).toBe(201)
            expect(body).toEqual(expect.any(Object))
            expect(body).toHaveProperty("access_token");
            expect(body).toHaveProperty("role");
            done();
        })
        .catch((err) => {
            done(err);
        })
    })

    test("[500 - Failed] Login Google", (done) => {
        request(app)
        .post("/public/googleLogin")
        .send({
            idToken: ""
        })
        .then((response) => {
            const { status, body } = response;
            expect(status).toBe(500)
            expect(body).toEqual(expect.any(Object))
            expect(body).toHaveProperty("message", "Internal server error")
            done();
        })
        .catch((err) => {
            done(err);
        })
    })
})
