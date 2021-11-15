const request = require("supertest");
const app = require("../app");
const fs = require("fs");
const { Category, Course, Comment, User, Video } = require("../models");

let token;
let loginParams = {
  email: "admin@gmail.com",
  password: "12345678",
};
const dataUsers = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));

beforeAll(async () => {
  try {
    await User.bulkCreate(dataUsers);

    const { body } = await request(app).post("/public/login").send(loginParams);

    token = body.access_token;
  } catch (err) {
    console.log(err);
  }
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

describe("POST /admin/categories", () => {
  test("[201 - Success] add category", async () => {
    await request(app).delete("/admin/categories/1").set("access_token", token);

    await request(app)
      .post("/admin/categories")
      .set("access_token", token)
      .send({ name: "Bahasa" });
  });
});

describe("POST /admin/courses", () => {
  test("[201 - Success] add course", async () => {
    const inputAdd = {
      name: "Bahasa Jepang",
      description: "belajar cepat bahasa jepang",
      price: 112000,
      thumbnailUrl:
        "https://i.ytimg.com/vi/hgvZeHkFg9E/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLBNFG6WY9Pv5MdeSeSr5XU_k-YE_Q",
      difficulty: "hard",
      status: "active",
      CategoryId: 1,
      Videos: [
        {
          name: "bahasa jepang",
          videoUrl: "https://www.youtube.com/embed/fp0mybLeagQ",
        },
        {
          name: "bahasa jepang",
          videoUrl: "https://www.youtube.com/embed/fp0mybLeagQ",
        },
      ],
    };

    await request(app)
      .post("/admin/categories")
      .set("access_token", token)
      .send({ name: "Bahasa" });

    const response = await request(app)
      .post(`/admin/courses`)
      .set("access_token", token)
      .send(inputAdd);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.any(Object));
  });

  test("[400 - Invalid Format] add video with invalid format ", async () => {
    const inputSample = {
      name: "Bahasa Jepang",
      description: "belajar cepat bahasa jepang",
      price: 112000,
      thumbnailUrl:
        "https://i.ytimg.com/vi/hgvZeHkFg9E/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLBNFG6WY9Pv5MdeSeSr5XU_k-YE_Q",
      difficulty: "hard",
      status: "active",
      CategoryId: 1,
    };

    const filePath = "assets/logo.png";
    const buffer = Buffer.from(filePath);

    const { status, body } = await request(app)
      .post("/admin/courses")
      .set("access_token", token)
      .field("name", inputSample.name)
      .field("description", inputSample.description)
      .field("price", inputSample.price)
      .field("thumbnailUrl", inputSample.thumbnailUrl)
      .field("difficulty", inputSample.difficulty)
      .field("status", inputSample.status)
      .field("CategoryId", inputSample.CategoryId)
      .attach("Videos", buffer, "logo.png");

    expect(status).toBe(400);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message", "File Format Should Be MP4");
  });

  test("[400 - Invalid Format] Catch invalid format size add course", async () => {
    
    jest.spyOn(Course, "create").mockRejectedValue("InvalidFileSize");
    const inputSample = {
      name: "Bahasa korea",
      description: "belajar cepat bahasa korea",
      price: 112000,
      thumbnailUrl:
        "https://i.ytimg.com/vi/hgvZeHkFg9E/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLBNFG6WY9Pv5MdeSeSr5XU_k-YE_Q",
      difficulty: "hard",
      status: "active",
      CategoryId: 1,
    };
    
    const filePath = "assets/viral.mp4";
    const buffer = Buffer.from(filePath)

    return request(app)
      .post("/admin/courses")
      .set("access_token", token)
      .field("name", inputSample.name)
      .field("description", inputSample.description)
      .field("price", inputSample.price)
      .field("thumbnailUrl", inputSample.thumbnailUrl)
      .field("difficulty", inputSample.difficulty)
      .field("status", inputSample.status)
      .field("CategoryId", inputSample.CategoryId)
      .attach("Videos", buffer, "draw.mp4")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty(
          "message",
          "Internal server error"
        );
      });
  });
});

describe("GET /admin/videos/:courseId", () => {
  test("[200 - Success] get detail video by id", async () => {
    const { status, body } = await request(app)
      .get("/admin/videos/1")
      .set("access_token", token)

    expect(status).toBe(200);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("videoUrl");
  });

  test("[201 - Success] add video", async () => {
    const filePath = "assets/viral.mp4";
    const buffer = Buffer.from(filePath);

    const { status, body } = await request(app)
      .post("/admin/videos/1")
      .set("access_token", token)
      .attach("Videos", buffer, "viral.mp4");

    expect(status).toBe(201);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("CourseId");
  })

  test("[200 - Success] update name video by video id", (done) => {
    request(app)
      .patch("/admin/videos/1")
      .set("access_token", token)
      .send({ name: "test aja :((" })
      .then((response) => {
        const { status, body } = response
        expect(status).toBe(200)
        expect(body).toEqual(expect.any(Object))
        expect(body).toHaveProperty('id')
        expect(body).toHaveProperty('name')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("[201 - Success] delete video by video id", async () => {
    const { status, body } = await request(app)
      .delete("/admin/videos/1")
      .set("access_token", token);

    expect(status).toBe(200);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message", "Video has been deleted");
  })

  test("[404 - Video Not Found] get detail video with invalid video id", async () => {
    const { body, status } = await request(app)
      .get("/admin/videos/9999999")
      .set("access_token", token);

    expect(status).toBe(404);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message", "Video Not Found");
  });
  
  test("[404 - Course Not Found] add video with invalid course id", async () => {
    const { body, status } = await request(app)
      .post("/admin/videos/9999999")
      .set("access_token", token);

    expect(status).toBe(404);
    expect(body).toEqual(expect.any(Object));
  });

  test("[404 - Video Not Found] delete video with invalid video id", async () => {
    const { body, status } = await request(app)
      .delete("/admin/videos/9999999")
      .set("access_token", token);

    expect(status).toBe(404);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message", "Video Not Found");
  });

  test("[404 - Video Not Found] update name video with invalid video id", async () => {
    const { body, status } = await request(app)
      .patch("/admin/videos/9999999")
      .set("access_token", token);

    expect(status).toBe(404);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message", "Video Not Found");
  })
});
