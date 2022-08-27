const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../middlewares/passport");
const User = require("../models/user.model");
const Patient = require("../models/patient.model");
const JWT = require("jsonwebtoken");
const IndexController = require("../controllers/index.controller");

const {
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
  registerUser,
  deleteUserById,
} = require("../controllers/user.controller");

router.route("/").get(IndexController.index);

router.route("/users").post(registerUser).get(getAllUsers);
router
  .route("/login")
  .post(passport.authenticate("local", { session: false }), loginUser);
router.route("/user/:id").delete(deleteUserById).get(getUserById);
router.route("/users/update/:id").put(updateUser);

module.exports = router;
