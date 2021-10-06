const express = require("express");
const router = express.Router();
const {login} = require("../../controller/auth/AuthController");

 router.post("/login",login);


module.exports = router;