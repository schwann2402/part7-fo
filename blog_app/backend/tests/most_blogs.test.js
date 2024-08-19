const { test, describe } = require("node:test");
const assert = require("node:assert");
const mostBlogs = require("../utils/list_helper").mostBlogs;

describe("most blogs", () => {
  test("returns author with the most blogs", () => {
    const blogs = [
      {
        author: "1",
        name: "first",
        likes: 1,
      },
      {
        author: "2",
        name: "second",
        likes: 3,
      },
      {
        author: "2",
        name: "third",
        likes: 5,
      },
    ];

    assert.deepStrictEqual(mostBlogs(blogs), {
      author: "2",
      blogs: 2,
    });
  });
});
