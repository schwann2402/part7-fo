const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/', async (_req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  return res.status(204).end()
})

module.exports = router