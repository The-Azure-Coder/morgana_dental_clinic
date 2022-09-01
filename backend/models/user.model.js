const db = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = db.Schema;

const userSchema = new db.Schema({
  role: {
    type: String,
    default: "user",
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  dentist: {
    type: Schema.Types.ObjectId,
    ref: "dentist",
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "patient",
  },

  // patients: [{ type: db.Schema.Types.ObjectId, ref: "patient" }],
});

// userSchema.pre("save", function (next) {
//   if (this.isModified("password")) return next();
//   bcrypt.hash(this.password, 10, (err, passwordHash) => {
//     if (err) return next(err);
//     this.password = passwordHash;
//     next();
//   });
// });

// userSchema.methods.comparePassword = function (password, cb) {
//   bcrypt.compare(password, this.password, (err, isMatch) => {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

module.exports = db.model("user", userSchema);
