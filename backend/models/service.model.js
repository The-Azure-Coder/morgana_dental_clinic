const db = require("mongoose");

let serviceSchema = new db.Schema({
  serviceName: {
    type: String,
    trim: true,
    unique: true,
  },

  serviceCost: {
    type: Number,
    trim: true,
    required: true,
  },
  serviceImg: {
    type: String,
    trim: true,
  },
  serviceDescrip: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = db.model("Services", serviceSchema);
