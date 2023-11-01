const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getAllUser = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: 'No users found' });
  }
  return res.status(200).json({ users });
};

// signup functionality

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: 'User already existed!, login instead' });
  }
  const user = new User({
    name,
    email,
    password: bcrypt.hashSync(password),
    blogs: [],
  });
  try {
    user.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json(user);
};

// login functionality

const login = async (req, res) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "Could'n find user with this email" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(404).json({ message: 'Incorrect password' });
  }
  return res.status(200).json({ message: 'Login successful' });
};

module.exports = { getAllUser, signup, login };
