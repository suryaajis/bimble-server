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

describe("[success] POST /public/login", () => {
  test("Result status code 200 and success login", async () => {
    const response = await request(app).post("/public/login").send(loginParams);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });
});

describe("[failed] POST /public/login", () => {
  test("Memberikan password yang salah", async () => {
    loginParams.password = "a";

    const response = await request(app).post("/public/login").send(loginParams);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid email/password");

    loginParams.password = "123456789";
  });

  test("Memberikan email yang salah / tidak ada di database", async () => {
    loginParams.email = "user1000@mail.com";

    const response = await request(app).post("/public/login").send(loginParams);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid email/password");
  });
});

afterAll(() => {
  User.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
