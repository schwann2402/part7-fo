const { test, describe } = require("node:test");
const assert = require("node:assert");
const totalLikes = require("../utils/list_helper").totalLikes;

describe("total likes", () => {
  test("of empty list is 0", () => {
    const blogs = [];
    assert.strictEqual(totalLikes(blogs), 0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const blogs = [
      {
        likes: 1,
      },
    ];
    assert.strictEqual(totalLikes(blogs), 1);
  });

  test("of a bigger list is calculated right", () => {
    const blogs = [
      {
        likes: 1,
      },
      {
        likes: 3,
      },
      {
        likes: 5,
      },
    ];
    assert.strictEqual(totalLikes(blogs), 9);
  });
});
