const db = require("mongoose");

const billSchema = new Schema({
  serviceCost: {
    type: Number,
  },

  discount: {
    type: Number,
    default: 0.1,
  },
});

module.exports = db.model("Bill", billSchema);
