/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import axios from "axios";

const EmployeersScreen = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newFirstName, setnewFirstName] = useState("");
  const [newLastName, setnewLastName] = useState("");
  const [newEmail, setnewEmail] = useState("");
  const [newPosition, setnewPosition] = useState("");
  const [newDepartment, setnewDepartment] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("api/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`api/employees/${id}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );
      toast.success("Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee :", error.message);
      toast.error("Failed to delete employee");
    }
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setnewFirstName("");
    setnewLastName("");
    setnewEmail("");
    setnewPosition("");
    setnewDepartment("");
  };

  const handleOpenUpdateModal = (employee) => {
    setSelectedEmployee(employee);
    setnewFirstName(employee.firstName);
    setnewLastName(employee.lastName);
    setnewEmail(employee.email);
    setnewPosition(employee.position);
    setnewDepartment(employee.department);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedEmployee(null);
    setnewFirstName("");
    setnewLastName("");
    setnewEmail("");
    setnewPosition("");
    setnewDepartment("");
    setShowUpdateModal(false);
  };

  const handleAddEmployee = async () => {
    try {
      const response = await axios.post("api/employees", {
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        position: newPosition,
        department: newDepartment,
      });
      const newEmployee = response.data;
      setEmployees([...employees, newEmployee]);
      toast.success("Employee added successfully");
      handleCloseAddModal();
    } catch (error) {
      console.error("Error adding employee:", error.message);
      toast.error("Failed to add employee");
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      const response = await axios.put(
        `api/employees/${selectedEmployee._id}`,
        {
          firstName: newFirstName,
          lastName: newLastName,
          email: newEmail,
          position: newPosition,
          department: newDepartment,
        }
      );
      const updatedEmployee = response.data;
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === updatedEmployee._id ? updatedEmployee : employee
        )
      );
      toast.success("Employee updated successfully");
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating employee:", error.message);
      toast.error("Failed to update employees");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-5">Employees List</h1>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>
                  {" "}
                  <Button
                    className="mr-2"
                    variant="danger"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    className="mr-2"
                    variant="success"
                    onClick={() => handleOpenUpdateModal(employee)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Button variant="primary" onClick={handleOpenAddModal}>
        Add Employee
      </Button>{" "}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={newFirstName}
              onChange={(e) => setnewFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={newLastName}
              onChange={(e) => setnewLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              value={newEmail}
              onChange={(e) => setnewEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPosition">
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter position"
              value={newPosition}
              onChange={(e) => setnewPosition(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter departmnent"
              value={newDepartment}
              onChange={(e) => setnewDepartment(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEmployee}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={newFirstName}
              onChange={(e) => setnewFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={newLastName}
              onChange={(e) => setnewLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              value={newEmail}
              onChange={(e) => setnewEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPosition">
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter position"
              value={newPosition}
              onChange={(e) => setnewPosition(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter departmnent"
              value={newDepartment}
              onChange={(e) => setnewDepartment(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateEmployee}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default EmployeersScreen;
