import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js"
import { Task } from "../models/task.models.js"
import { Subtask } from "../models/subtask.models.js"
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose  from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";
import { MIMEType } from "util";

const getTasks = asyncHandler(async(req, res) => {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if(!project) {
        throw new ApiError(404, "Project not found");
    }

    const tasks = await Task.find({
        project: new mongoose.Types.ObjectId(projectId),
    }).populate("assignedTo", "avatar username fullname");

    return res
        .status(201)
        .json(
            new ApiResponse(201, tasks, "Task fetched successfully"),
        );
});

const createTask = asyncHandler(async(req, res) => {
    const { title, description, assignedTo, status } = req.body;
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if(!project) {
        throw new ApiError(404, "Project not found");
    }

    const files = req.files || []

    const attachments = files.map((file) => {
        return {
            url: `${process.env.SERVER_URL}/images/${file.originalname}`,
            MIMEType: file.MIMEType,
            size: file.size
        }
    });

    // Creat Task
    const task = await Task.create({
        title,
        description,
        project: new mongoose.Types.ObjectId(projectId),
        assignedTo: assignedTo ? new mongoose.Types.ObjectId(assignedTo) : undefined,
        status,
        assignedBy: new mongoose.Types.ObjectId(req.User._id),
        attachments
    });

    return res
        .status(201)
        .json(
            new ApiResponse(201, task, "Task created successfully")
        );
});

const getTaskById = asyncHandler(async(req, res) => {
});

const updateTask = asyncHandler(async(req, res) => {
});

const daleteTask = asyncHandler(async(req, res) => {
});

const createSubTask = asyncHandler(async(req, res) => {
});

const updateSubTask = asyncHandler(async(req, res) => {
});

const deleteSubTask = asyncHandler(async(req, res) => {
});

export {
    createSubTask,
    createTask,
    daleteTask,
    deleteSubTask,
    getTaskById,
    getTasks,
    updateSubTask,
    updateTask
};