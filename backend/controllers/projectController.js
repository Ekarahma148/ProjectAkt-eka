// backend/controllers/projectController.js
import {
    createProject,
    getProjectsByUser,
    deleteProject,
  } from '../models/projectModel.js';
  
  export const handleCreateProject = async (req, res) => {
    const { name, description } = req.body;
    try {
      const project = await createProject(name, description, req.user.id);
      res.status(201).json(project);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const handleGetProjects = async (req, res) => {
    try {
      const projects = await getProjectsByUser(req.user.id);
      res.json(projects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const handleDeleteProject = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await deleteProject(id, req.user.id);
      if (!deleted) return res.status(404).json({ message: 'Project not found or unauthorized' });
      res.json({ message: 'Project deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  