const { JSONResponse } = require("../lib/helper");
// const passport = require("passport");
// const passportConfig = require("../middlewares/passport");
// const User = require("../models/user.model");
// const Patient = require("../models/patient.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../models/user.model");

exports.loginUser = async (req, res) => {
  const username = req.body?.email;
  const password = req.body?.password;
  console.log("details", username, password);
  if (username && password) {
    await Users.findOne({ email: username }).then(
      (existUser) => {
        if (existUser && existUser._id) {
          bcrypt.compare(
            password,
            existUser?.password,
            function (err, response) {
              if (!err && response) {
                const auth = jwt.sign(
                  { user_id: existUser._id, username },
                  "secretKey"
                );
                res.json({
                  status: "ok",
                  loginUser: true,
                  data: { existUser, response, auth },
                });
              } else {
                res.json({
                  status: "warn",
                  loginUser: false,
                  data: "Please enter valid password",
                });
              }
            }
          );
        } else {
          res.json({
            status: "warn",
            loginUser: false,
            data: "Please enter valid email",
          });
        }
      },
      (error) => {
        res.json({ status: "error", data: error });
      }
    );
  }
};

exports.registerUser = async (req, res) => {
  const registerUserData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  const salt = await bcrypt.genSalt(10);
  await bcrypt.hash(req.body.password, salt).then((hashedPassword) => {
    if (hashedPassword) {
      console.log("hashed password", hashedPassword);
      registerUserData.password = hashedPassword;
    }
  });

  await Users.create(registerUserData)
    .then((userStoredData) => {
      if (userStoredData && userStoredData._id) {
        console.log("user stored data", userStoredData);
        res.json({ status: "ok", data: userStoredData });
      }
    })
    .catch((err) => {
      if (err) {
        res.json({ status: "error", data: err });
        console.error(err);
      }
    });
};

// const signToken = (userID) => {
//   return JWT.sign(
//     {
//       iss: "betaTest",
//       sub: userID,
//     },
//     "betaTest",
//     { expiresIn: "1hr" }
//   );
// };

// exports.registerUser = (req, res) => {
//   const { username, password, role } = req.body;
//   Users.findOne({ username }, (err, user) => {
//     if (err)
//       res
//         .status(500)
//         .json({ message: { msgBody: "Error has Occured", msgError: true } });
//     if (user)
//       res.status(500).json({
//         message: { msgBody: "Account already exists", msgError: true },
//       });
//     else {
//       const newUser = new Users({ username, password, role });
//       newUser.save((err) => {
//         if (err)
//           res.status(500).json({
//             message: { msgBody: "Error has Occured", msgError: true },
//           });
//         else
//           res.status(500).json({
//             message: {
//               msgBody: "Account has been added Sucussfully",
//               msgError: false,
//             },
//           });
//       });
//     }
//   });
// };

// exports.loginUser = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     const { _id, username, role } = req.user;
//     const token = signToken(_id);
//     res.cookie("access_token", token, { httpOnly: true, sameSite: true });
//     res.status(200).json({ isAuthenticated: true, user: { username, role } });
//   }
// };

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find().populate("dentist").populate("patient");
    JSONResponse.success(res, "Success.", allUsers, 200);
  } catch (error) {
    JSONResponse.error(
      res,
      "Failure handling User Model.",
      console.log(error),
      500
    );
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    JSONResponse.success(res, "Success.", user, 200);
  } catch (error) {
    JSONResponse.error(res, "Failure handling user Model.", error, 500);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body);
    JSONResponse.success(res, "Success.", updatedUser, 200);
  } catch (error) {
    JSONResponse.error(
      res,
      "Failure handling servces model.",
      console.log(error),
      500
    );
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user) await user.delete();
    JSONResponse.success(res, "Success.", user, 200);
  } catch (error) {
    JSONResponse.error(
      res,
      "Failure handling user model.",
      console.log(error),
      500
    );
    console.log(error);
  }
};
