import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import employees from "./data/employees.js";
import departments from "./data/departments.js";
import Department from "./models/Department.js";
import Employee from "./models/Employee.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Department.deleteMany();
    await Employee.deleteMany();

    const createEmployee = await Employee.insertMany(employees);

    await Department.insertMany(departments);

    console.log("Data Imported !".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Department.deleteMany();
    await Employee.deleteMany();

    console.log("Data Destroyed !".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
