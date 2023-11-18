import express from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee, // Updated function name
} from "../controllers/employeeController.js";

const router = express.Router();

// Routes for handling department-related operations
router.route("/").get(getEmployees).post(createEmployee);
// Updated function name

router
  .route("/:id")
  .get(getEmployeeById)
  .delete(deleteEmployee)
  .put(updateEmployee); // Updated function name

export default router;
