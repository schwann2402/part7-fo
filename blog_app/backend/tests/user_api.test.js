const { test, after, describe } = require("node:test");
const assert = require("node:assert");
const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);
const User = require("../models/user");
const mongoose = require("mongoose");

describe("user creation test", () => {
  test("login with a password", async () => {
    const amountOfUsers = (await User.find({})).map((user) =>
      user.toJSON()
    ).length;

    console.log(amountOfUsers);
    const newUser = {
      username: "tito",
      password: "sa",
    };

    await api.post("/api/login").send(newUser).expect(400);

    const response = await api.get("/api/users");
    console.log(response.body.length);
    assert.strictEqual(response.body.length ?? 0, amountOfUsers);
  });
});

after(async () => {
  await mongoose.connection.close();
});
