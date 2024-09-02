const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const employeeMiddleware = require('../middleware/employeeMiddleware');

// Define routes for employees
router.get('/', employeeMiddleware, employeeController.getDashboardData);
router.get('/:id', employeeController.getEmployeeById);
router.post('/', employeeController.createEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);



router.get('/dashboard', employeeMiddleware, employeeController.getDashboardData);
router.get('/all',employeeController.getAllEmployees);


module.exports = router;

