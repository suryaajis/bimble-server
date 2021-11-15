const request = require("supertest");
const app = require("../app");
const fs = require("fs");
const { Category, Course, Comment, User, Video } = require("../models");

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


beforeAll(async () => {
  await User.bulkCreate(dataUsers);
  await Category.bulkCreate(dataCategories);
  await Course.bulkCreate(dataCourses);
  await Video.create({
    name: "Nilai Mutlak - Bagian 1",
    videoUrl: "hhhhhhh",
    CourseId: 1,
  });
  await Comment.bulkCreate([
    {
      comment: "waw keren",
      UserId: 3,
      VideoId: 1,
    },
    {
      comment: "wihhh",
      UserId: 4,
      VideoId: 1,
    },
  ]);

  const { body } = await request(app).post("/public/login").send(loginParams);

  token = body.access_token;
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
  test("[200 - Success] get all user", (done) => {
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

  test("[500 - Error] Catch error user find all", async () => {
    jest.spyOn(User, "findAll").mockRejectedValue("Error");

    return request(app)
      .get("/admin/users")
      .set("access_token", token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Internal server error");
      })
  });
});

describe("GET /admin/courses", () => {
  test("[200 - Success] get all courses", (done) => {
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

  test("[200 - Success] get courses by id", (done) => {
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

  test("[200 - Success] get courses with search by name", (done) => {
    request(app)
      .get("/public/courses?search=akun")
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

  test("[200 - Success] get courses dengan pagination", (done) => {
    request(app)
      .get("/admin/courses?page=1")
      .set("access_token", token)
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

  test("[200 - Success] edit course", (done) => {
    const inputEdit = {
      name: "Bahasa Jepang",
      description: "belajar cepat bahasa jepang",
      price: 112000,
      thumbnailUrl:
        "https://i.ytimg.com/vi/hgvZeHkFg9E/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLBNFG6WY9Pv5MdeSeSr5XU_k-YE_Q",
      difficulty: "hard",
      status: "inactive",
      CategoryId: 2,
    };

    request(app)
      .put("/admin/courses/2")
      .set("access_token", token)
      .send(inputEdit)
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

  test("[200 - Success] change status course", (done) => {
    const inputStatus = {
      status: "inactive",
    };
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

  test("[404 - Course Not Found] get courses detail with wrong id", (done) => {
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

  test("[400 - Invalid Input] add course with empty string", (done) => {
    const sample = {
      name: "Bahasa Jepang",
      description: "",
      price: 112000,
      thumbnailUrl:
        "https://i.ytimg.com/vi/hgvZeHkFg9E/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLBNFG6WY9Pv5MdeSeSr5XU_k-YE_Q",
      difficulty: "hard",
      status: "active",
      CategoryId: 1,
    };

    request(app)
      .post("/admin/courses")
      .set("access_token", token)
      .send(sample)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Description can't be empty");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[404 - Course Not Found] change status course with wrong id", (done) => {
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

  test("[400 - Invalid Input] edit course with empty string input", (done) => {
    const inputEdit = {
      name: "",
      description: "cek",
      price: 112000,
      thumbnailUrl:
        "https://i.ytimg.com/vi/hgvZeHkFg9E/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLBNFG6WY9Pv5MdeSeSr5XU_k-YE_Q",
      difficulty: "hard",
      status: "inactive",
      CategoryId: 2,
    };

    request(app)
      .put("/admin/courses/2")
      .set("access_token", token)
      .send(inputEdit)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Name can't be empty");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[404 - Course Not Found] edit course by wrong id", (done) => {
    const inputEdit = {
      name: "",
      description: "",
      price: 112000,
      thumbnailUrl:
        "https://i.ytimg.com/vi/hgvZeHkFg9E/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLBNFG6WY9Pv5MdeSeSr5XU_k-YE_Q",
      difficulty: "hard",
      status: "inactive",
      CategoryId: 2,
    };

    request(app)
      .put("/admin/courses/9999999")
      .set("access_token", token)
      .send(inputEdit)
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

  test("[400 - Invalid Input] change status course with empty string", (done) => {
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

  test("[404 - Invalid Input] change status course by wrong id", (done) => {
    const emptyStatus = {
      status: "",
    };
    request(app)
      .patch("/admin/courses/999999")
      .set("access_token", token)
      .send(emptyStatus)
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

  test("[404 - Course Not Found] get course with invaild page ", (done) => {
    request(app)
      .get("/admin/courses?page=0")
      .set("access_token", token)
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

describe("GET /admin/categories", () => {
  test("[200 - Success] get all categories", (done) => {
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

  test("[200 - Success] delete category", (done) => {
    request(app)
      .delete("/admin/categories/2")
      .set("access_token", token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty(
          "message",
          `Course and category with id 2 has been deleted`
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[500 - Error] Catch error category find all", async () => {
    jest.spyOn(Category, "findAll").mockRejectedValue("Error");

    return request(app)
      .get("/admin/categories")
      .set("access_token", token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Internal server error");
      })
  });

  test("[400 - Invalid Input] add category wtih empty string input", (done) => {
    const inputCategory = {
      name: "",
    };
    request(app)
      .post("/admin/categories")
      .set("access_token", token)
      .send(inputCategory)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "Name can't be empty");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[400 - Category Not Found] delete category with wrong id", (done) => {
    request(app)
      .delete("/admin/categories/1000")
      .set("access_token", token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", `Category Not Found`);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /admin/comments/:commentId", () => {
  test("[200 - Success] delete comment by id", async () => {
    const { body, status } = await request(app)
      .delete(`/admin/comments/2`)
      .set("access_token", token);

    expect(status).toBe(200);
    expect(body).toHaveProperty("message", "Comment has been deleted");
    expect(body).toEqual(expect.any(Object));
  });

  test("[404 - Comment Not Found] delete comment by wrong id", async () => {
    const { body, status } = await request(app)
      .delete(`/admin/comments/9999999`)
      .set("access_token", token);

    expect(status).toBe(404);
    expect(body).toHaveProperty("message", "Comment Not Found");
    expect(body).toEqual(expect.any(Object));
  });
});

describe("Authorization Test", () => {
  test("[401 - Unauthorized] get all user with login by role user", async () => {
    loginUser = {
      email: "udin@gmail.com",
      password: "12345678",
    };

    const { body } = await request(app).post("/public/login").send(loginUser);

    tokenUser = body.access_token;

    const response = await request(app)
      .get(`/admin/users`)
      .set("access_token", tokenUser);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "You're not authorized");
    expect(response.body).toEqual(expect.any(Object));
  });
});
