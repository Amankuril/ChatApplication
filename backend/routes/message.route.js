const express = require('express');
const router = express.Router();
const messageController = require("../controllers/message.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.get("/users", authMiddleware, messageController.getUsersForSidebar);
router.get("/:id", authMiddleware, messageController.getMessages);
router.post("/send/:id", authMiddleware, messageController.sendMessage);

module.exports = router;