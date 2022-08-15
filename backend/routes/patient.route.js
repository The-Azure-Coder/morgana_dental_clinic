const express = require("express");
const router = express.Router();
const IndexController = require("../controllers/index.controller");
const {
  getAllPatients,
  createPatient,
  deletePatienttById,
  getPatientById,
  updatePatient,
} = require("../controllers/patient.controller");

router.route("/").get(IndexController.index);

router.route("/patients").post(createPatient).get(getAllPatients);

router.route("/patients/:id").delete(deletePatienttById).get(getPatientById);

router.route("/patients/update/:id").put(updatePatient);

module.exports = router;
