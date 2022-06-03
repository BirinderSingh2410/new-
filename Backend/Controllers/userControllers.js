//This file consist of the operations to be done like signup,login

const asyncHandler = require("express-async-handler"); //for error handling
const User = require("../models/userModel");
const generateToken = require("../Config/generateToken");

//When User Signup

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    //If the name email and passowrd is not their
    res.status(400);
    throw new Error("Please Enter All fields");
  }

  const UserExists = await User.findOne({ email }); //if user exits ,query to search in mongo

  if (UserExists) {
    res.status(400);
    throw new Error("User already Exist");
  }

  const user = await User.create({
    // if its a new user query to add new field in mongo
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      //if new user is added we send the data w/o password
      _id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id), //it allows to authorize the acces to user
    });
  } else {
    //if this fails
    res.status(400);
    throw new Error("Failed to Create User");
  }
});

//When User login

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    console.log(password);
    throw new Error("invalid Email or password");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  //for searching the user
  const keyword = req.query.search
    ? {
        $or: [
          //returns the data of the user with name or email equavalent
          { name: { $regex: req.query.search, $options: "i" } }, //regex:helps in matching string
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }); //$ne:not equal
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
