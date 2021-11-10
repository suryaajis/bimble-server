const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

let token
let loginParams
beforeAll(async () => {
  loginParams = {
    email: "user.test@mail.com",
    password: "123456789",
  };

  const { body } = await request(app)
    .post("/public/login")
    .send(loginParams);

  token = body.access_token;
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("GET /users", () => {
  test("200 success get login user", (done) => {
    request(app)
      .get("/public/users")
      .then((response) => {
        const { body, status } = response;
        console.log(response.body)
        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

// describe("GET /users/:userId", () => {
//   test("200 success get courses by courseId", (done) => {
//     request(app)
//       .get("/public/courses/2")
//       .then((response) => {
//         const { body, status } = response;
//         console.log(response.body);
//         expect(body).toEqual(expect.any(Object));
//         expect(body).toHaveProperty("name");
//         expect(body).toHaveProperty("Category");
//         expect(body).toHaveProperty("Videos");
//         expect(status).toBe(200);
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

//   test("[404 - Course Not Found] get course with invaild course id ", (done) => {
//     request(app)
//       .get("/public/courses/1000")
//       .then((response) => {
//         const { status, body } = response;
//         expect(status).toBe(404);
//         expect(body).toEqual(expect.any(Object));
//         expect(body).toHaveProperty("message", "Course not found");
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
// });
