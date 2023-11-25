import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import errorHandler from "./middlware/errorHandler.js";
import cors from "cors";
dotenv.config();
const app = express();
connectDB();

const port = process.env.PORT || 3000;
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port  ${port}`);
});
