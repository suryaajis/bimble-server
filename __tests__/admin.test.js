const request = require("supertest");
const app = require("../app");
const { Category, Course, Comment, User, Video } = require("../models");
const fs = require("fs");

let token;
let loginParams = {
  email: "admin@gmail.com",
  password: "12345678",
};
const dataCategories = JSON.parse(
  fs.readFileSync("./data/categories.json", "utf-8")
);
const dataCourses = JSON.parse(fs.readFileSync("./data/courses.json", "utf-8"));
const dataUsers = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
const dataVideos = JSON.parse(fs.readFileSync("./data/videos.json", "utf-8"));
const dataComments = JSON.parse(
  fs.readFileSync("./data/comments.json", "utf-8")
);

beforeAll(async () => {
  try {
    await User.bulkCreate(dataUsers);
    await Category.bulkCreate(dataCategories);
    await Course.bulkCreate(dataCourses);

    const { body } = await request(app).post("/public/login").send(loginParams);

    token = body.access_token;
  } catch (err) {
    console.log(err);
  }
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
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Video.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Comment.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("GET /admin/users", () => {
  test("[200 - success] get all user", (done) => {
    request(app)
      .get("/admin/users")
      .set("access_token", token)
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

describe("GET /admin/courses", () => {
  test("[200 - success] get all courses", (done) => {
    request(app)
      .get("/admin/courses")
      .set("access_token", token)
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

  test("[200 - success] get courses by id", (done) => {
    request(app)
      .get("/admin/courses/2")
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

  test("[200 - success] change status course", (done) => {
    const inputStatus = {
      status: "inactive"
    }
    request(app)
      .patch("/admin/courses/2")
      .set("access_token", token)
      .send(inputStatus)
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



  test("[404 - course not found] get courses detail with wrong id", (done) => {
    request(app)
      .get("/admin/courses/1000")
      .set("access_token", token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Course Not Found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[404 - course not found] change status course with wrong id", (done) => {
    const inputStatus = {
      status: "inactive",
    };
    request(app)
      .patch("/admin/courses/1000")
      .set("access_token", token)
      .send(inputStatus)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Course Not Found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[400 - input status empty] change status course with empty string", (done) => {
    const emptyStatus = {
      status: "",
    };
    request(app)
      .patch("/admin/courses/2")
      .set("access_token", token)
      .send(emptyStatus)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Status can't be empty");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /admin/categories", () => {
  test("[200 - success] get all categories", (done) => {
    request(app)
      .get("/admin/categories")
      .set("access_token", token)
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

  test("[201 - success] add category", (done) => {
    const inputCategory = {
      name: "Bahasa"
    }

    request(app)
      .post("/admin/categories")
      .set("access_token", token)
      .send(inputCategory)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("name");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

// test("[201 - success] add course", (done) => {
//   const input = {
//     name: "Bahasa Jepang",
//     description: "belajar cepat bahasa jepang",
//     price: 50000,
//     thumbnailUrl:
//       "https://i.ytimg.com/vi/strzhKqA_sQ/hqdefault.jpg?s…RUAAIhCGAE=&rs=AOn4CLCVGKk89pHJwWo1ORt8hzlH1iM9rg",
//     difficulty: "medium",
//     status: "active",
//     CategoryId: 7,
//     Videos: [
//       {
//         name: "jepang is easy",
//         videoUrl: "https://www.youtube.com/embed/WJr11FExG7s",
//       },
//     ],
//   };

//   request(app)
//     .post("/admin/courses")
//     .set("access_token", token)
//     .send(input)
//     .then((response) => {
//       const { body, status } = response;
//       console.log(body)
//       expect(status).toBe(200);
//       expect(body).toEqual(expect.any(Object));
//       done();
//     })
//     .catch((err) => {
//       done(err);
//     });
// });
