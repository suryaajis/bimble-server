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
    fullName: "user1",
    email: "user1@mail.com",
    password: "rahasia",
    phone: "0858528528",
    address: "Indonesia",
  };
});

describe("[success] POST /customers/register", () => {
  test("Menghasilkan status code 201 dan berhasil register", async () => {
    const response = await request(app).post("/customers/register").send(registerParams);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.any(Object));
  });
});

describe("[failed] POST /customers/register", () => {
  test("Tidak menginputkan email", async () => {
    delete registerParams.email;

    const response = await request(app).post("/customers/register").send(registerParams);

    // Hasil Output
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", [
      "User.email cannot be null",
    ]);

    registerParams.email = "user1@mail.com";
  });

  test("Tidak menginputkan password", async () => {
    delete registerParams.password;

    const response = await request(app).post("/customers/register").send(registerParams);

    // Hasil Output
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", [
      "User.password cannot be null",
    ]);

    registerParams.password = "rahasia";
  });

  test("Email string kosong", async () => {
    registerParams.email = "";

    const response = await request(app).post("/customers/register").send(registerParams);

    // Hasil Output
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", [
      "Email is required!",
      "Invalid format email!",
    ]);

    registerParams.email = "user1@mail.com";
  });

  test("Password string kosong", async () => {
    registerParams.password = "";

    const response = await request(app).post("/customers/register").send(registerParams);

    // Hasil Output
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", ["Password is required!"]);

    registerParams.password = "rahasia";
  });

  test("Email sudah terdaftar", async () => {
    const response = await request(app).post("/customers/register").send(registerParams);

    // console.log(response.body);
    // Hasil Output
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", ["email must be unique"]);

    registerParams.password = "rahasia";
  });
});


