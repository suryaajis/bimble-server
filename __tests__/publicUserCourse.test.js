const request = require("supertest");
const app = require("../app.js");
const { UserCourse, User, Course, Category, Video } = require("../models");

let userToken;

beforeAll(async () => {
  user = await User.create({
    name: "user",
    email: "user@mail.com",
    password: "bimblebukanbejol",
    role: "User",
  });

  await Category.create({
    name: "Matematika",
  });

  for (let i = 0; i < 4; i++) {
    await Course.create({
      name: `Test Course ${i}`,
      description: `Matematika ilmu yang menyenangkan.....`,
      price: 145000,
      thumbnailUrl:
        "https://i.ytimg.com/vi/WJr11FExG7s/hqdefault.jpg?s…RUAAIhCGAE=&rs=AOn4CLAImD8rRbQR7cuFCw3Z_xsjLlr1Tg",
      difficulty: "medium",
      status: "active",
      rating: 8,
      CategoryId: 1,
    });
  }

  await UserCourse.bulkCreate([
    {
      UserId: 1,
      CourseId: 1,
      isPaid: true,
    },
    {
      UserId: 1,
      CourseId: 2,
      isPaid: false,
    },
  ]);

  await Video.create({
    name: "Nilai Mutlak - Bagian 1",
    videoUrl: "hhhhhhh",
    CourseId: 1,
  });

  // login to take a access_token
  userToken = await request(app)
    .post("/public/login")
    .send({ email: "user@mail.com", password: "bimblebukanbejol" });
});

beforeEach(() => {
  jest.restoreAllMocks();
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
  await Category.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Course.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await UserCourse.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Video.destroy({ truncate: true, cascade: true, restartIdentity: true });
});

describe("GET /public/userCourse", () => {
  test("[201 - Success] Add UserCourse", (done) => {
    request(app)
      .post("/public/userCourses/3")
      .set("access_token", userToken.body.access_token)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(201);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("UserId");
        expect(body).toHaveProperty("CourseId");
        expect(body).toHaveProperty("isPaid");
        expect(body).toHaveProperty("chargeId");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[200 - Success] get all userCourse after login", (done) => {
    request(app)
      .get("/public/userCourse")
      .set("access_token", userToken.body.access_token)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Object));
        expect(body[0]).toHaveProperty("UserId");
        expect(body[0]).toHaveProperty("CourseId");
        expect(body[0]).toHaveProperty("isPaid");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[200 - Success] get userCourse with course id after login ", (done) => {
    request(app)
      .get("/public/userCourses/2")
      .set("access_token", userToken.body.access_token)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("UserId");
        expect(body).toHaveProperty("CourseId");
        expect(body).toHaveProperty("isPaid");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[404 - Course Not Found] get userCourse with invaild course id ", (done) => {
    request(app)
      .get("/public/userCourses/1000")
      .set("access_token", userToken.body.access_token)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(404);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Course Not Found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[401 - InvalidInput] get all userCourse before login", (done) => {
    request(app)
      .get("/public/userCourse")
      .set("access_token", "")
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(401);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Invalid email/password");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[401 - InvalidInput] get all userCourse after login with invalid account", (done) => {
    request(app)
      .get("/public/userCourse")
      .set(
        "access_token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2MzY1NjExOTN9.acunlADBP6o5d9VaJ8xFu9ldRM93SLcFE9yBsmqMHuk"
      )
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(401);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Invalid email/password");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[401 - JsonWebTokenError] get all userCourse after login with invalid token", (done) => {
    request(app)
      .get("/public/userCourse")
      .set("access_token", "BP6o5d9VaJ8xFu9ldRM93SLcFE9yBsmqMHuk")
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(401);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Unauthorized");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[404 - Course Not Found] Add UserCourse with invalid course id", (done) => {
    request(app)
      .post("/public/userCourses/999999")
      .set("access_token", userToken.body.access_token)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(404);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Course Not Found")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[400 - Course Purchased] Add UserCourse with add same course", (done) => {
    request(app)
      .post("/public/userCourses/1")
      .set("access_token", userToken.body.access_token)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(400);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Course Already Purchased")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[500 - Error] Catch error user courses find all", async () => {
    jest.spyOn(UserCourse, "findAll").mockRejectedValue("Error");

    return request(app)
      .get("/public/userCourse")
      .set("access_token", userToken.body.access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Internal server error");
      })
  });

  test("[500 - Error] Catch error add user course", async () => {
    jest.spyOn(UserCourse, "create").mockRejectedValue("Error");

    return request(app)
      .post("/public/userCourses/4")
      .set("access_token", userToken.body.access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Internal server error");
      })
  });
});
