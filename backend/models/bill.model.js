const db = require("mongoose");
const Schema = db.Schema;
const billSchema = new Schema({
  serviceCost: {
    type: Number,
  },

  patientId: {
    type: Schema.Types.ObjectId,
    ref: "patient",
  },
});

module.exports = db.model("bill", billSchema);
