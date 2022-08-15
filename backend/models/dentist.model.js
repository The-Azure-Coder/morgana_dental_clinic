const db = require("mongoose");
const Schema = db.Schema;

let dentistSchema = new db.Schema({
  first_nm: {
    type: String,
    required: true,
    trim: true,
  },
  last_nm: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
});

module.exports = db.model("Dentist", dentistSchema);
