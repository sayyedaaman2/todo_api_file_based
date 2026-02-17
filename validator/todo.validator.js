import {body,param} from 'express-validator';


export const createTodoValidator = [
    body("title").notEmpty().withMessage("title is required").isLength({min : 3}).withMessage("Title must be at least 3 characters"),
    body("description").notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters"),
    body("completed").optional().isBoolean().default(false)
]

export const updateTodoValidator = [
    body("title").optional().isLength({min : 3}).withMessage("Title must be at least 3 characters"),
    body("description").optional()
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters"),
    body("completed").optional().isBoolean().default(false)
]

export const paramValidator = [
    param("id").notEmpty().withMessage("Please provide the id params")
]