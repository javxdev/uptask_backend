import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";

const router = Router()

/** Routes for projects */

router.post('/',
    body('projectName')
        .notEmpty().withMessage('The project must have a project name'),
    body('clientName')
        .notEmpty().withMessage('The project must have a client name'),
    body('description')
        .notEmpty().withMessage('The project must have a description'),

    handleInputErrors,
    ProjectController.createProject
)
router.get('/', ProjectController.getAllProjects)

router.get('/:id',
    param('id')
        .isMongoId().withMessage('Not valid ID'),

    handleInputErrors,
    ProjectController.getProjectById
)

router.put('/:id',
    param('id')
    .isMongoId().withMessage('Not valid ID'),
    body('projectName')
    .notEmpty().withMessage('The project must have a project name'),
    body('clientName')
    .notEmpty().withMessage('The project must have a client name'),
    body('description')
    .notEmpty().withMessage('The project must have a description'),
    
    handleInputErrors,
    ProjectController.updateProject
)

router.delete('/:id',
    param('id')
    .isMongoId().withMessage('Not valid ID'),
    
    handleInputErrors,
    ProjectController.deleteProject
)

/** Routes for tasks */

router.param('projectId', validateProjectExists)

router.post('/:projectId/tasks',
    validateProjectExists,
    body('name')
        .notEmpty().withMessage('The task must have a name'),
    body('description')
        .notEmpty().withMessage('The task must have a description'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)

router.get('/:projectId/tasks/:taskId',
    param('taskId')
        .isMongoId().withMessage('Not valid ID'),
    handleInputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
    param('taskId')
        .isMongoId().withMessage('Not valid ID'),
    body('name')
        .notEmpty().withMessage('The task must have a name'),
    body('description')
        .notEmpty().withMessage('The task must have a description'),
    handleInputErrors,
    TaskController.updateTask
)

export default router