const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

let registerParams;
beforeAll(() => {
  User.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  registerParams = {
    name: "user1",
    email: "user1@mail.com",
    password: "123456789",
  };
});

describe("[success] POST /public/register", () => {
  test("Result status code 201 and success register", async () => {
    const response = await request(app).post("/public/register").send(registerParams);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.any(Object));
  });
});

describe("[failed] POST /public/register", () => {
  test("Email not inserted", async () => {
    delete registerParams.email;

    const response = await request(app).post("/public/register").send(registerParams);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email can't be empty");

    registerParams.email = "user1@mail.com";
  });

  test("Password not inserted", async () => {
    delete registerParams.password;

    const response = await request(app).post("/public/register").send(registerParams);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password can't be empty");

    registerParams.password = "123456789";
  });

  test("Email empty string", async () => {
    registerParams.email = "";

    const response = await request(app).post("/public/register").send(registerParams);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email can't be empty");

    registerParams.email = "user1@mail.com";
  });

  test("Password empty string", async () => {
    registerParams.password = "";

    const response = await request(app).post("/public/register").send(registerParams);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password can't be empty");

    registerParams.password = "123456789";
  });

  test("Password length less than 8 characters", async () => {
    registerParams.password = "1234567"

    const response = await request(app).post('/public/register').send(registerParams)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("message", "The password must contain minimal 8 characters.")

    registerParams.password = "123456789"
  }) 
})