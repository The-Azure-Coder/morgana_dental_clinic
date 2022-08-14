const express = require("express");
const router = express.Router();
const IndexController = require("../controllers/index.controller");
const {
  createDentist,
  getAllDentist,
  getDentistById,
  updateDentist,
  deleteDentistById,
} = require("../controllers/dentist.controller");

router.route("/").get(IndexController.index);

router.route("/dentists").post(createDentist).get(getAllDentist);
router.route("/dentists/:id").delete(deleteDentistById).get(getDentistById);
router.route("/dentists/update/:id").put(updateDentist);

module.exports = router;
