const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  console.log('req.body', req.body);
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error('all fields are mandatory');
  }
  const userAvailable = await userModel.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error('user already registred');
  }
  //hash password
  const hashpassword = await bcrypt.hash(password, 10);
  console.log('hashed password:', hashpassword);
  const user = await userModel.create({
    userName,
    email,
    password: hashpassword,
  });
  console.log(`user created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error('user data is not valid');
  }
});
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    res.status(400);
    throw new Error('all fields are mandatory');
  }
  const user = await userModel.findOne({ email });
  // comparing password  with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10m' }
    );
    res.status(200).json({
      accesToken,
      user: {
        userName: user.userName,
        email: user.email,
        id: user.id,
      },
    });
  } else {
    res.status(401);
    throw new Error('email or password is incorrect');
  }
});
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, login, currentUser };
