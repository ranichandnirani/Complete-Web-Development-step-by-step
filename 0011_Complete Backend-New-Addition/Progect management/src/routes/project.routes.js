import { Router } from "express";
import { 
    addMembersToProject,
    createProject,
    deleteMember,
    getProjects,
    getProjectById,
    getProjectMembers,
    updateProject,
    deleteProject,
    updateMembersRole,
}  from "../controllers/project.controllers.js";

import { validate } from "../middlewares/validator.middleware.js";

import { 
    createProjectValidator,
    addMembersToProjectValidator,
} from "../validators/index.js"; 

import { 
    verifyJWT,
    validateProjectPermission,
} from "../middlewares/auth.middleware.js";

import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const router = Router();
router.use(verifyJWT)

router
    .route("/")
    .get(getProjects)
    .post(createProjectValidator(), validate, createProject);

router
    .route("/:projectId")
    .get(validateProjectPermission(AvailableUserRole), getProjectById)
    .put(
        validateProjectPermission([UserRolesEnum.ADMIN]), 
        createProjectValidator(),
        validate,
        updateProject,
    )
    .delete(validateProjectPermission([UserRolesEnum.ADMIN]),deleteProject);  
    
router
    .route("/:projectId/member")
    .get(getProjectMembers)
    .post(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        addMembersToProjectValidator(),
        validate,
        addMembersToProject
    );

router
    .route("/:projectId/member/:userId")
    .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateMembersRole)
    .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteMember);

export default router;