const { test, describe } = require("node:test");
const assert = require("node:assert");
const mostLikes = require("../utils/list_helper").mostLikes;

describe("most likes", () => {
  test("returns author with the most likes", () => {
    const blogList = [
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
      {
        author: "3",
        name: "fourth",
        likes: 5,
      },
      {
        author: "3",
        name: "fourth",
        likes: 5,
      },
      {
        author: "3",
        name: "fourth",
        likes: 5,
      },
      {
        author: "4",
        name: "fourth",
        likes: 20,
      },
      {
        author: "5",
        name: "fourth",
        likes: 5,
      },
      {
        author: "6",
        name: "fourth",
        likes: 5,
      },
    ];

    assert.deepStrictEqual(mostLikes(blogList), {
      author: "4",
      likes: 20,
    });
  });
});
