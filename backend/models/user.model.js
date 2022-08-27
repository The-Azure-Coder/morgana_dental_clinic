const db = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new db.Schema({
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },

  patients: [{ type: db.Schema.Types.ObjectId, ref: "patient" }],
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = db.model("user", userSchema);
