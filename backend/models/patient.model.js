const db = require("mongoose");
const Schema = db.Schema;

let patientSchema = new db.Schema({
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
  address: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },

  dob: {
    type: Date,
    required: true,
  },

  gender: {
    type: String,
    require: true,
  },

  regDate: {
    type: Date,
    default: Date.now(),
  },
  checkoutDate: {
    type: Date,
  },

  caringDentist: {
    type: Schema.Types.ObjectId,
    ref: "Dentist",
  },
});

module.exports = db.model("Patient", patientSchema);
