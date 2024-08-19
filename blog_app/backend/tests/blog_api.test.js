const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const agent = require("superagent");

const api = supertest(app);

test("there are no blogs", async () => {
  const amountOfBlogs = (await Blog.find({})).map((blog) =>
    blog.toJSON()
  ).length;

  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, amountOfBlogs);
});

test("the unique identifier is id", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(JSON.stringify(response).includes("id"), true);
});

test("successfully creates a new blog", async () => {
  const amountOfBlogs = (await Blog.find({})).map((blog) =>
    blog.toJSON()
  ).length;

  const newBlog = {
    title: "test",
    author: "Tito",
    url: "www.tito.com",
    likes: 2,
  };

  await api
    .post("/api/blogs")
    .auth(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRtbnpyIiwiaWQiOiI2NmIwNDljYmVhODRhOTg5NzZkYTRhNTYiLCJpYXQiOjE3MjI4MzA5NzgsImV4cCI6MTcyMjgzNDU3OH0.1jkUYu386QDVOdP7kmju6XHTZOPXRDZPnPyrIEyzRkU",
      { type: "bearer" }
    )
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  console.log(response.body);

  assert.strictEqual(response.body.length, amountOfBlogs + 1);
});

test("if likes property is not passed when creating an object, a default of 0 is assigned", async () => {
  const newBlog = {
    title: "test_no_id",
    author: "Tito",
    url: "www.tito.com",
  };

  const response = await api.post("/api/blogs").send(newBlog);
  const likes = response.body.likes;
  assert.strictEqual(likes, 0);
});

test("if title or url is missing from a blog, it is not created", async () => {
  const amountOfBlogs = (await Blog.find({})).map((blog) =>
    blog.toJSON()
  ).length;

  const newBlog = {
    title: "test_no_url",
    author: "Tito",
  };

  await api.post("/api/blogs").send(newBlog).expect(500);

  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, amountOfBlogs);
});

test("A blog can be updated", async () => {
  const updatedBlog = {
    title: "Bla",
    author: "Tito",
    url: "https://www.bla.com",
    likes: 5,
  };

  await api
    .put("/api/blogs/66ad5b5587c8ee8c05b5057d")
    .send(updatedBlog)
    .expect(200);

  const blog = await Blog.findById("66ad5b5587c8ee8c05b5057d");
  console.log(blog.likes);
  assert.strictEqual(blog.likes, 5);
});

test("A blog can be deleted", async () => {
  const amountOfBlogs = (await Blog.find({})).map((blog) =>
    blog.toJSON()
  ).length;

  await api.delete("/api/blogs/66ad4aaa480064aa4dc4a2cd").expect(204);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, amountOfBlogs - 1);
});

after(async () => {
  await mongoose.connection.close();
});
