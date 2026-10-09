const express = require("express");

const router = express.Router();

const installationController = require("../controllers/installationController");

router.post("/", installationController.install);

module.exports = router;