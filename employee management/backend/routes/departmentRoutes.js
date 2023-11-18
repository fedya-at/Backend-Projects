import express from "express";
import {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment, // Updated function name
} from "../controllers/departmentController.js";

const router = express.Router();

// Routes for handling department-related operations
router
  .route("/")
  .get(getDepartments)
  .post(createDepartment)
   // Updated function name

router
  .route("/:id")
  .get(getDepartmentById)
  .delete(deleteDepartment)
  .put(updateDepartment);; // Updated function name

export default router;
