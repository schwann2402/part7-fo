const { test, describe } = require("node:test");
const assert = require("node:assert");
const favoriteBlog = require("../utils/list_helper").favoriteBlog;

describe("favoriteBook", () => {
  test("returns favorite from a variety of books", () => {
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
        author: "3",
        name: "third",
        likes: 5,
      },
    ];
    assert.deepStrictEqual(favoriteBlog(blogs), {
      author: "3",
      name: "third",
      likes: 5,
    });
  });
});
