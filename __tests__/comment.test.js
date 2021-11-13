const request = require("supertest");
const app = require("../app");
const fs = require("fs");
const {
  Category,
  Course,
  Comment,
  User,
  Video,
  UserCourse,
} = require("../models");

let token;
let loginParams = {
  email: "udin@gmail.com",
  password: "12345678",
};
const dataCategories = JSON.parse(
  fs.readFileSync("./data/categories.json", "utf-8")
);
const dataCourses = JSON.parse(fs.readFileSync("./data/courses.json", "utf-8"));
const dataUsers = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
const dataMyCourse = JSON.parse(
  fs.readFileSync("./data/userCourse.json", "utf-8")
);

beforeAll(async () => {
  await User.bulkCreate(dataUsers);
  await Category.bulkCreate(dataCategories);
  await Course.bulkCreate(dataCourses);
  await Video.bulkCreate([
    {
      name: "Nilai Mutlak - Bagian 1",
      videoUrl: "hhhhhhh",
      CourseId: 1,
    },
    {
      name: "Nilai Mutlak - Bagian 2",
      videoUrl: "eeeee",
      CourseId: 2,
    },
  ]);
  
  await UserCourse.bulkCreate(dataMyCourse);

  const { body } = await request(app).post("/public/login").send(loginParams);

  token = body.access_token;
});

afterAll(async () => {
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

describe("GET /public/userCourse", () => {
  test("[201 - Success] Add Comment", (done) => {
    request(app)
      .post("/public/comments/1")
      .set("access_token", token)
      .send({
        comment: "waw keren banget",
      })
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(201);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("comment");
        expect(body).toHaveProperty("VideoId");
        expect(body).toHaveProperty("UserId");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[401 - InvalidInput] Add Comment before login", (done) => {
    request(app)
      .post("/public/comments/1")
      .set("access_token", "")
      .send({
        comment: "waw keren banget",
      })
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

  test("[400 - InvalidInput] Add Comment before buy course", async () => {
    const { status, body } = await request(app)
      .post("/public/comments/2")
      .set("access_token", token)
      .send({
        comment: "belum beli"
      });
  

    expect(status).toBe(400);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message", "You must buy first");
  });

  test("[400 - Video Not Found] Add Comment with wrong video id", async () => {
    const { status, body } = await request(app)
      .post("/public/comments/99999")
      .set("access_token", token)
      .send({
        comment: "belum beli"
      });

    expect(status).toBe(404);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message", "Video Not Found");
  });
});
