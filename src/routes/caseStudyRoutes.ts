import express from 'express';
import {
  createProjectController,
  getAllProjectsController,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController
} from '../controllers/caseStudyController';

const router = express.Router();

router.get('/projects', getAllProjectsController);
router.post('/projects', createProjectController);
router.get('/projects/:id', getProjectByIdController);
router.put('/projects/:id', updateProjectController);
router.delete('/projects/:id', deleteProjectController);

export default router;
