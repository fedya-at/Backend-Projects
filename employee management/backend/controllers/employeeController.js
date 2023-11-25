import asyncHandler from "express-async-handler";
import Employee from "../models/Employee.js";
import mongoose from "mongoose";

// @desc    Fetch all employees
// @route   GET /api/employees
// @access  Public
const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({});

  res.json(employees);
});

// @desc    Fetch single employee
// @route   GET /api/employees/:id
// @access  Public
const getEmployeeById = asyncHandler(async (req, res) => {
  const id = req.params.id.trim();

  try {
    const employee = await Employee.findById(id);

    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: "Employee not found" });
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

// @desc    Delete single employee
// @route   DELETE /api/employees/:id
// @access  Public/Admin
const deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Employee.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.json({ message: "Employee Removed Successfully" });
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// @desc    Create employee
// @route   POST /api/employees
// @access  Private/Admin
const createEmployee = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, position, department } = req.body;

  const newEmployee = new Employee({
    firstName: firstName || "Sample First Name",
    lastName: lastName || "Sample Last Name",
    email: email || "sample@email.com",
    position: position || "Sample Position",
    department: department || "Sample Department",
  });

  const createdEmployee = await newEmployee.save();
  res.status(201).json(createdEmployee);
});

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private/Admin
const updateEmployee = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, position, department } = req.body;

  const employee = await Employee.findById(req.params.id);

  if (employee) {
    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.email = email;
    employee.position = position;
    employee.department = department;

    const updatedEmployee = await employee.save(); // Corrected variable name
    res.status(201).json(updatedEmployee);
  } else {
    res.status(404);
    throw new Error("Employee Not Found");
  }
});
const searchEmployees = async (req, res) => {
  try {
    const query = req.query.query;
    console.log("Received query:", query);

    const employees = await Employee.find({
      $or: [
        { firstName: { $regex: new RegExp(query, "i") } },
        { lastName: { $regex: new RegExp(query, "i") } },
        { email: { $regex: new RegExp(query, "i") } },
        { position: { $regex: new RegExp(query, "i") } },
        { department: { $regex: new RegExp(query, "i") } },
      ],
    });

    console.log("Found employees:", employees);

    res.json(employees);
  } catch (error) {
    console.error("Error searching employees:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getEmployees,
  getEmployeeById,
  deleteEmployee,
  createEmployee,
  updateEmployee,
  searchEmployees,
};
