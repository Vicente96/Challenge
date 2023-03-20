const express = require("express");
const teamUserController = require("../../controllers/teamUserController");
const router = express.Router();

router.get("/", teamUserController.getAllTeamUsers);

router.get("/:idTeamUser",teamUserController.getOneTeamUser);

router.post("/", teamUserController.createNewTeamUser);

router.put("/:idTeamUser", teamUserController.updateOneTeamUser);

router.delete("/:idTeamUser", teamUserController.deleteOneTeamUser);

module.exports = router;