import usersController from "../controllers/usersController";

const router = require("express").Router();

router.post('/', usersController.create);

export default { router }