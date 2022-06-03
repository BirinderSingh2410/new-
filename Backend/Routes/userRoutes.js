const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../Controllers/userControllers");
const { protect } = require("../middelware/authMiddleware");

const router = express.Router(); //router is like to make objects of operations(eg:get,post,delete) and consist of controllers as parameter

router.route("/").post(registerUser); //for signUp

router.route("/").get(protect, allUsers); //for searching .. and protect act as middleware which enables that protect will run first then the allUSers.

router.post("/login", authUser); //for login option

module.exports = router;
