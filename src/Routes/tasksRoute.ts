import validateToken from "../auth/validateJWT";
import tasksController from "../controllers/tasksController";

const router = require("express").Router();

router.get('/', validateToken, tasksController.getAll);
router.get('/:id', validateToken, tasksController.getById);
router.post('/', validateToken, tasksController.create);
router.patch('/:id', validateToken, tasksController.updateTaskById);
router.delete('/:id', validateToken, tasksController.removeTaskById);

export default { router }
