// routes/index.js
const express = require("express");
const userController = require("../controllers/userController");
const gameController = require("../controllers/gameController");

const router = express.Router();

router.post("/users", userController.createUser);
router.get("/users/:userId/wallet", userController.getWallet);
router.post("/game/check", gameController.checkCube);

module.exports = router;
