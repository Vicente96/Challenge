const express = require("express");
const accountController = require("../../controllers/accountController");
const router = express.Router();

router.get("/", accountController.getAllAccounts);

router.get("/:idAccount",accountController.getOneAccount);

router.post("/", accountController.createNewAccount);

router.put("/:idAccount", accountController.updateOneAccount);

router.delete("/:idAccount", accountController.deleteOneAccount);

module.exports = router;