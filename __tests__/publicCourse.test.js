const request = require("supertest");
const app = require("../app");
const { Category, Course, Video } = require("../models");
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
  await Video.bulkCreate([
    {
      id: 1,
      name: "Program Linear Part 1",
      videoUrl: "https://www.youtube.com/embed/WJr11FExG7s",
      CourseId: 1,
    },
    {
      id: 2,
      name: "Program Linear Part 2",
      videoUrl: "https://www.youtube.com/embed/fp0mybLeagQ",
      CourseId: 1,
    },
  ]);
});

beforeEach(() => {
  jest.restoreAllMocks();
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
  await Video.destroy({
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

  test("200 success get courses dengan 1 query filter parameter", (done) => {
    request(app)
      .get("/public/courses?price=desc")
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

  test("200 success get courses dengan filter category", (done) => {
    request(app)
      .get("/public/courses?categoryId=2")
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

  test("200 success get courses dengan 3 query filter parameter", (done) => {
    request(app)
      .get("/public/courses?difficulty=easy&price=desc&search=ma")
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

  test("200 success get courses dengan pagination", (done) => {
    request(app)
      .get("/public/courses?page=1")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("totalCourse");
        expect(body).toHaveProperty("course");
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
      .get("/public/courses/1")
      .then((response) => {
        const { body, status } = response;
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
      .get("/public/courses/999999")
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

  test("[404 - Course Not Found] get course with invaild page ", (done) => {
    request(app)
      .get("/public/courses?page=0")
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
});

describe("GET /categories", () => {
  test("[200 - Success] get all categories", (done) => {
    request(app)
      .get("/public/categories")
      .then((response) => {
        const { body, status } = response;
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
        expect(status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[500 - Failed] Catch error category find all", async () => {
    jest.spyOn(Category, "findAll").mockRejectedValue("Error");

    return request(app)
      .get("/public/categories")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Internal server error");
      })
      .catch((err) => {
        done(err);
      });
  });
});
