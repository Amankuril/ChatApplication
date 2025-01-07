const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const authMiddleware = require ("../middlewares/auth.middleware.js");


router.post("/register", authController.register);  
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.put("/update", authMiddleware, authController.update);
router.get("/check", authMiddleware, authController.checkAuth);

module.exports = router;
