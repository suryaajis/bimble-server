const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

let loginParams;
beforeAll(() => {
  User.create({
    fullName: "user10",
    email: "user10@mail.com",
    password: "rahasia",
    role: "Customer",
    phone: "0858528528",
    address: "Indonesia",
  });

  loginParams = {
    email: "user10@mail.com",
    password: "rahasia",
  };
});

describe("[success] POST /customers/login", () => {
  test("Menghasilkan status code 200 dan berhasil login", async () => {
    const response = await request(app).post("/customers/login").send(loginParams);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });
});

describe("[failed] POST /customers/login", () => {
  test("Memberikan password yang salah", async () => {
    loginParams.password = "a";

    const response = await request(app).post("/customers/login").send(loginParams);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Email/Password");

    loginParams.password = "rahasia";
  });

  test("Memberikan email yang salah / tidak ada di database", async () => {
    loginParams.email = "user1000@mail.com";

    const response = await request(app).post("/customers/login").send(loginParams);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Email/Password");
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
