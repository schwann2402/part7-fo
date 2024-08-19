const blog = require("../models/blog");
const Blog = require("../models/blog");
const blogsRouter = require("express").Router();
const middleware = require("../utils/middleware");

let token;

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  return res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  res.json(blog);
});

blogsRouter.post("/", middleware.userExtractor, async (req, res) => {
  const user = req.user;

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    user: user.id,
    url: req.body.url,
    likes: req.body.likes || 0,
    comments: req.body.comments || [],
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.post(
  "/:id/comments",
  middleware.userExtractor,
  async (req, res) => {
    const id = req.params.id;
    const blogToUpdate = await Blog.findById(id);
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        ...blogToUpdate.toObject(),
        comments: blogToUpdate.comments.concat(req.body.comment),
      },
      {
        new: true,
      }
    );
    return res.json(updatedBlog);
  }
);

blogsRouter.put("/:id", middleware.userExtractor, async (req, res) => {
  const user = req.user;

  const blog = {
    title: req.body.title,
    author: req.body.author,
    user: user.id,
    url: req.body.url,
    likes: req.body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });

  return res.json(updatedBlog);
});

blogsRouter.delete("/:id", middleware.userExtractor, async (req, res) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "blog not found" });
  }
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } else {
    return res
      .status(401)
      .json({ error: "You can't delete a blog you did not create" });
  }
});

module.exports = blogsRouter;
