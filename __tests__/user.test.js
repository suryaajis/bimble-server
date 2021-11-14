const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

let token;
let loginParams;
beforeAll(async () => {
  await User.create({
    name: "user.test",
    email: "user.test@mail.com",
    password: "123456789",
    role: "User",
  });

  loginParams = {
    email: "user.test@mail.com",
    password: "123456789",
  };

  const { body } = await request(app).post("/public/login").send(loginParams);

  token = body.access_token;
});

beforeEach(() => {
  jest.restoreAllMocks();
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("GET /users", () => {
  test("[500 - Error] Catch error user detail find one", async () => {
    jest.spyOn(User, "findOne").mockRejectedValue("Error");

    return request(app)
      .get("/public/users")
      .set("access_token", token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Internal server error");
      });
  });

  test("[200 - success] get login user", (done) => {
    request(app)
      .get("/public/users")
      .set("access_token", token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PUT /public/users", () => {
  test("[500 - Error] Catch error user update", async () => {
    jest.spyOn(User, "update").mockRejectedValue("Error");
    const dataUpdate = {
      name: "user.update",
      email: "user.update@mail.com",
    };

    return request(app)
      .put("/public/users")
      .set("access_token", token)
      .send(dataUpdate)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Internal server error");
      });
  });

  test("[200 - success] update public login user", (done) => {
    const dataUpdate = {
      name: "user.update",
      email: "user.update@mail.com",
    };

    request(app)
      .put("/public/users")
      .set("access_token", token)
      .send(dataUpdate)
      .then((response) => {
        const { body, status } = response;
        expect(body).toEqual(expect.any(Object));
        expect(status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[401 - empty input] update public login user with empty name", (done) => {
    const dataUpdate = {
      name: "",
      email: "user.update@mail.com",
    };

    request(app)
      .put("/public/users")
      .set("access_token", token)
      .send(dataUpdate)
      .then((response) => {
        const { body, status } = response;
        expect(body).toEqual(expect.any(Object));
        expect(status).toBe(401);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
