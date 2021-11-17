const request = require("supertest");
const app = require("../app.js");
const fs = require("fs");
const { UserCourse, User, Course, Category, Rating } = require("../models");

let userToken;
const dataCategories = JSON.parse(
  fs.readFileSync("./data/categories.json", "utf-8")
);
const dataCourses = JSON.parse(fs.readFileSync("./data/courses.json", "utf-8"));
const dataUsers = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
const dataUserCourse = JSON.parse(
  fs.readFileSync("./data/userCourse.json", "utf-8")
);
const dataRatings = JSON.parse(fs.readFileSync("./data/ratings.json", "utf-8"));

beforeAll(async () => {
  await User.bulkCreate(dataUsers);
  await Category.bulkCreate(dataCategories);
  await Course.bulkCreate(dataCourses);
  await UserCourse.bulkCreate(dataUserCourse);
  await Rating.bulkCreate(dataRatings);
  jest.setTimeout(90 * 1000);

  // login to take a access_token
  userToken = await request(app)
    .post("/public/login")
    .send({ email: "kosasih@mail.com", password: "bimblebukanbejol" })
})

beforeEach(() => {
  jest.restoreAllMocks();
})

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
  await Rating.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("GET /public/ratings/:courseId", () => {
  test("[200 - Success] get average ratings", (done) => {
    request(app)
      .get("/public/ratings/1")
      .set("access_token", userToken.body.access_token)
      .then((response) => {
        const { status, body } = response;

        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("rating");
        done();
      })
      .catch((err) => {
        done(err);
      })
  })

  test("[200 - Success] get rating by userid & courseid", (done) => {
    request(app)
      .get("/public/ratingUser/1")
      .set("access_token", userToken.body.access_token)
      .then((response) => {
        const { status, body } = response;

        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("rating");
        done();
      })
      .catch((err) => {
        done(err);
      })
  })

  test("[404 - Course Not Found] Get Rating with wrong course id", (done) => {
    request(app)
      .get("/public/ratings/999999")
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

  test("[500 - Error] Catch error rating find One by userId & courseId", async () => {
    jest.spyOn(Rating, "findOne").mockRejectedValue("Error");

    return request(app)
      .get("/public/ratingUser/1")
      .set("access_token", userToken.body.access_token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(500)
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Internal server error");
      })
  })
});

describe("POST /public/ratings/:courseId", () => {
  test("[201 - Success] add Rating", async () => {
    await Rating.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    })

    const { status, body } = await request(app)
      .post("/public/ratings/1")
      .set("access_token", userToken.body.access_token)
      .send({
        rating: 8,
      });

    expect(status).toBe(201);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("rating");
  })

  test("[400 - AlreadyRated] User already rated course", async () => {
    const { status, body } = await request(app)
      .post("/public/ratings/1")
      .set("access_token", userToken.body.access_token)
      .send({
        rating: 8,
      })

    expect(status).toBe(400)
    expect(body).toEqual(expect.any(Object))
    expect(body).toHaveProperty("message", "You have already rated this course")
  })

  test("[400 - CourseNotPaid] Add Rating before purchase course", (done) => {
    request(app)
      .post("/public/ratings/2")
      .set("access_token", userToken.body.access_token)
      .send({
        rating: 8,
      })
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(400);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "You must buy first");
        done();
      })
      .catch((err) => {
        done(err);
      })
  })

  test("[400 - Maximal rating is 10] add a rating with a value that exceeds the maximum", async () => {
    await Rating.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    })

    const { status, body } = await request(app)
      .post("/public/ratings/1")
      .set("access_token", userToken.body.access_token)
      .send({
        rating: 11,
      })

      expect(status).toBe(400)
      expect(body).toEqual(expect.any(Object))
      expect(body).toHaveProperty("message", "Maximal rating is 10")
  })
})
