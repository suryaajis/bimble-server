const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

let loginParams;
beforeAll(() => {
  User.create({
    name: "user10",
    email: "user10@mail.com",
    password: "123456789",
    role: "User",
  });

  loginParams = {
    email: "user10@mail.com",
    password: "123456789",
  };
});

describe("[200 - Success] POST /public/login", () => {
  test("Result status code 200 and success login", async () => {
    const response = await request(app).post("/public/login").send(loginParams);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });
});

describe("[400 - Failed] POST /public/login", () => {
  test("Input wrong password", async () => {
    loginParams.password = "a";

    const response = await request(app).post("/public/login").send(loginParams);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid email/password");

    loginParams.password = "123456789";
  });

  test("input wrong email", async () => {
    loginParams.email = "user1000@mail.com";

    const response = await request(app).post("/public/login").send(loginParams);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid email/password");
  });
});

// describe("[200 - Success] POST /public/login", () => {
//   test("Result status code 200 and success login", async () => {
//     const response = await request(app).post("/public/login").send(loginParams);

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(expect.any(Object));
//   });
// });


afterAll(() => {
  User.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
