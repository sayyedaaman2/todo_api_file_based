import {Router} from 'express'
import * as todoController from '../../../controller/todo.controller.js'
const router = Router();

router.post("/todos",todoController.postTodo);
router.put("/todos/:id",todoController.updateTodoById);

router.get("/todos",todoController.getTodo);


export default router