import { Request, Response } from 'express';
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject } from '../services/caseStudyService';

export const getAllProjectsController = async (req: Request, res: Response): Promise<void> => {
    const result = await getAllProjects();
    res.status(result.status).json(result);
};

export const createProjectController = async (req: Request, res: Response): Promise<void> => {
    const projectData = req.body;
    const result = await createProject(projectData);
    res.status(result.status).json(result);
};

export const getProjectByIdController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await getProjectById(id);
    res.status(result.status).json(result);
};

export const updateProjectController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updateData = req.body;
    const result = await updateProject(id, updateData);
    res.status(result.status).json(result);
};

export const deleteProjectController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await deleteProject(id);
    res.status(result.status).json(result);
};
