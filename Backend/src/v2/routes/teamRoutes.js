const express = require("express");
const teamController = require("../../controllers/teamController");
const router = express.Router();

router.get("/", teamController.getAllTeams);

router.get("/:idTeam",teamController.getOneTeam);

router.post("/", teamController.createNewTeam);

router.put("/:idTeam", teamController.updateOneTeam);

router.delete("/:idTeam", teamController.deleteOneTeam);

module.exports = router;