import {Router} from 'express'
import * as todoController from '../../../controller/todo.controller.js'
import validate from '../../../middleware/validate.js'
import {createTodoValidator,updateTodoValidator,paramValidator} from '../../../validator/todo.validator.js'
const router = Router();

router.post("/todos",createTodoValidator,validate,todoController.postTodo);
router.put("/todos/:id",paramValidator,updateTodoValidator,validate,todoController.updateTodoById);
router.get("/todos",todoController.getTodo);
router.delete("/todos/:id",paramValidator,validate, todoController.deleteTodoById)

export default router