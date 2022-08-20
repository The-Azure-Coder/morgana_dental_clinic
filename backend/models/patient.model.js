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
  phoneNumber: {
    type: String,
    trim: true,
  },

  email: {
    type: String,
    trim: true,
  },

  age: {
    type: Number,
    trim: true,
  },

  dob: {
    type: Date,
    required: true,
  },
  caringDentist: {
    type: Schema.Types.ObjectId,
    ref: "Dentist",
  },
  regDate: {
    type: Date,
    default: Date.now(),
  },
  appointDate: {
    type: Date,
    default: new Date(Date.now() + 12096e5),
  },
});

module.exports = db.model("Patient", patientSchema);
