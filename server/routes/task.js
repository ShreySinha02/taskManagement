const express = require('express');
const router = express.Router();
const {
  handleCreateTask,
  handleDeleteTask,
  handleCreateSubTask,
  handleDeleteSubTask,
  handleAddAssignee,
  handleDeleteAssignee,
  getTasks,
  getTaskById,
  getSubtasksByTaskId,
  getActivitiesByTaskId,
} = require('../controllers/task');

router.post('/createTask', handleCreateTask);
router.post('/deleteTask', handleDeleteTask);
router.post('/createSubTask', handleCreateSubTask);
router.post('/deleteSubTask', handleDeleteSubTask);
router.post('/task/addAssignee', handleAddAssignee);
router.post('/task/deleteAssignee', handleDeleteAssignee);
router.get('/tasks', getTasks);
router.get('/tasks/:taskId', getTaskById);
router.get('/tasks/:taskId/subtasks', getSubtasksByTaskId);
router.get('/tasks/:taskId/activities', getActivitiesByTaskId);

module.exports = router;
