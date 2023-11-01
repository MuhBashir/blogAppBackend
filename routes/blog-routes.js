const express = require('express');
const {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
  getUserById,
} = require('../controllers/blog-controller');
const blogRouter = express.Router();

blogRouter.get('/', getAllBlogs);
blogRouter.post('/add', addBlog);
blogRouter.put('/update/:id', updateBlog);
blogRouter.get('/:id', getBlogById);
blogRouter.delete('/:id', deleteBlog);
blogRouter.get('/user/:id', getUserById);

module.exports = blogRouter;
