import asyncHandler from "express-async-handler";
import Department from "../models/Department.js";
import mongoose from "mongoose";

// @desc    Fetch all departments
// @route   GET /api/departments
// @access  Public
const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find({});

  res.json(departments);
});

// @desc    Fetch single department
// @route   GET /api/departments/:id
// @access  Public
const getDepartmentById = asyncHandler(async (req, res) => {
  const id = req.params.id.trim();

  try {
    const department = await Department.findById(id);

    if (department) {
      res.json(department);
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    // Handle the specific error related to ObjectId
    if (error instanceof mongoose.Error.CastError && error.path === "_id") {
      res.status(400).json({ error: "Invalid ObjectId" });
    } else {
      // Handle other errors
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// @desc    Delete single department
// @route   DELETE /api/departments/:id
// @access  Public/Admin
const deleteDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Department.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.json({ message: "Department Removed Successfully" });
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// @desc    Create department
// @route   POST /api/departments
// @access  Private/Admin
const createDepartment = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const newDepartment = new Department({
    name: name || "Sample Name", // Use the provided name or default to "Sample Name"
  });

  const createdDepartment = await newDepartment.save();
  res.status(201).json(createdDepartment);
});

// @desc    Update department
// @route   PUT /api/departments/:id
// @access  Private/Admin
const updateDepartment = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const department = await Department.findById(req.params.id);

  if (department) {
    department.name = name;

    const updatedDepartment = await department.save(); // Corrected variable name
    res.status(201).json(updatedDepartment);
  } else {
    res.status(404);
    throw new Error("Department Not Found");
  }
});
const searchDepartments = async (req, res) => {
  try {
    const query = req.query.query;
    const departments = await Department.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
      ],
    });

    res.json(departments);
  } catch (error) {
    console.error("Error searching departments:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getDepartments,
  getDepartmentById,
  deleteDepartment,
  createDepartment,
  updateDepartment,
  searchDepartments,
};
