const request = require("supertest");
const app = require("../app");
const { Category, Course } = require("../models");
const fs = require("fs");

beforeAll(async () => {
  const dataCategory = JSON.parse(
    fs.readFileSync("./data/categories.json", "utf-8")
  );
  const dataCourses = JSON.parse(
    fs.readFileSync("./data/courses.json", "utf-8")
  );

  await Category.bulkCreate(dataCategory);
  await Course.bulkCreate(dataCourses);
});

afterAll(async () => {
  await Course.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Category.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("GET /courses", () => {
  test("200 success get courses", (done) => {
    request(app)
      .get("/public/courses")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /courses/:courseId", () => {
  test("200 success get courses by courseId", (done) => {
    request(app)
      .get("/public/courses/2")
      .then((response) => {
        const { body, status } = response;
        console.log(response.body);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("name");
        expect(body).toHaveProperty("Category");
        expect(body).toHaveProperty("Videos");
        expect(status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[404 - Course Not Found] get course with invaild course id ", (done) => {
    request(app)
      .get("/public/courses/1000")
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(404);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Course not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
