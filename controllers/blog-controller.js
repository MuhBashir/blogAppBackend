const { default: mongoose } = require('mongoose');
const Blog = require('../models/Blog');
const User = require('../models/User');

const getAllBlogs = async (req, res) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (error) {
    return console.log(error);
  }
  if (!blogs) {
    console.log(blogs);
    return res.status(404).json({ message: 'No blog Found' });
  }
  return res.status(200).json({ blogs });
};

// adding blog functionlity

const addBlog = async (req, res) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: 'We can not find blog by this ID' });
  }
  const blog = Blog({
    title,
    description,
    image,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: error });
  }
  return res.status(200).json({ blog });
};

// updating a blog
const updateBlog = async (req, res) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: 'Unable to update the blog' });
  }
  return res.status(200).json({ blog });
};

// getting a single blog
const getBlogById = async (req, res) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: 'No matching blog found' });
  }
  return res.status(200).json({ blog });
};

// deleting a blog
const deleteBlog = async (req, res) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate('user');
    await blog.user.blogs.pull(blog);
  } catch (error) {
    return console.log(error);
  }

  if (!blog) {
    return res.status(500).json({ message: 'Unable to delete blog' });
  }
  return res.status(200).json({ message: 'Blog deleted successfully' });
};

const getUserById = async (req, res) => {
  let userId = req.params.id;

  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate('blogs');
  } catch (error) {
    return console.log(error);
  }

  if (!userBlogs) {
    return res.status(404).json({ message: 'No blog found' });
  }

  res.status(200).json({ blogs: userBlogs });
};
module.exports = {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
  getUserById,
};
