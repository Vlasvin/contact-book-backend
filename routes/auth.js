const express = require("express");
const { schemas } = require("../schemas/usersSchemas");
const { validateBody } = require("../middlewares");
const ctrl = require("../controllers/authControllers");

const router = express.Router();
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

module.exports = router;
