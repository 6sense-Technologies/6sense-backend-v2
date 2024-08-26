import Project from '../models/casestudyModel'; 
import { IProject } from '../models/casestudyModel';
import { IApiResponse } from '../types'

export const createProject = async (projectData: IProject): Promise<IApiResponse> => {
  try {
    const newProject = new Project(projectData);
    const savedProject = await newProject.save();
    return {
      status: 201,
      data: savedProject,
      message: 'Project successfully created',
    };
  } catch (error: any) {
    return {
      status: error.status || 500,
      errorCode: error.code,
      message: error.message || 'An error occurred',
      data: {},
    };
  }
};

export const getAllProjects = async (): Promise<IApiResponse> => {
  try {
    const projects = await Project.find();
    return {
      status: 200,
      data: projects,
      message: 'Projects retrieved successfully',
    };
  } catch (error: any) {
    return {
      status: error.status || 500,
      errorCode: error.code,
      message: error.message || 'An error occurred',
      data: {},
    };
  }
};

export const getProjectById = async (projectId: string): Promise<IApiResponse> => {
  try {
    const project = await Project.findById(projectId);
    if (project) {
      return {
        status: 200,
        data: project,
        message: 'Project details retrieved successfully',
      };
    } else {
      return {
        status: 404,
        message: 'Project not found',
        data: {},
      };
    }
  } catch (error: any) {
    return {
      status: error.status || 500,
      errorCode: error.code,
      message: error.message || 'An error occurred',
      data: {},
    };
  }
};

export const updateProject = async (
  projectId: string,
  updateData: Partial<IProject>
): Promise<IApiResponse> => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $set: updateData },
      { new: true }
    )

    if (updatedProject) {
      return {
        status: 200,
        data: updatedProject,
        message: 'Project successfully updated',
      };
    } else {
      return {
        status: 404,
        message: 'Project not found',
        data: {},
      };
    }
  } catch (error: any) {
    return {
      status: error.status || 500,
      errorCode: error.code,
      message: error.message || 'An error occurred',
      data: {},
    };
  }
};

export const deleteProject = async (projectId: string): Promise<IApiResponse> => {
  try {
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (deletedProject) {
      return {
        status: 200,
        data: {},
        message: 'Project successfully deleted',
      };
    } else {
      return {
        status: 404,
        message: 'Project not found',
        data: {},
      };
    }
  } catch (error: any) {
    return {
      status: error.status || 500,
      errorCode: error.code,
      message: error.message || 'An error occurred',
      data: {},
    };
  }
};
