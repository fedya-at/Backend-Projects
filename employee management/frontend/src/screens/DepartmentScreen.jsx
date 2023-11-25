/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const DepartmentScreen = () => {
  const [departments, setDepartments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [newDepartmentName, setNewDepartmentName] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("api/departments");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error.message);
        toast.error("Failed to fetch departments");
      }
    };

    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`api/departments/${id}`);
      setDepartments((prevDepartments) =>
        prevDepartments.filter((department) => department._id !== id)
      );
      toast.success("Department deleted successfully");
    } catch (error) {
      console.error("Error deleting department:", error.message);
      toast.error("Failed to delete department");
    }
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewDepartmentName("");
  };

  const handleOpenUpdateModal = (department) => {
    setSelectedDepartment(department);
    setNewDepartmentName(department.name);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedDepartment(null);
    setNewDepartmentName("");
    setShowUpdateModal(false);
  };

  const handleAddDepartment = async () => {
    try {
      const response = await axios.post("api/departments", {
        name: newDepartmentName,
      });
      const newDepartment = response.data;
      setDepartments([...departments, newDepartment]);
      toast.success("Department added successfully");
      handleCloseAddModal();
    } catch (error) {
      console.error("Error adding department:", error.message);
      toast.error("Failed to add department");
    }
  };

  const handleUpdateDepartment = async () => {
    try {
      const response = await axios.put(
        `api/departments/${selectedDepartment._id}`,
        {
          name: newDepartmentName,
        }
      );
      const updatedDepartment = response.data;
      setDepartments((prevDepartments) =>
        prevDepartments.map((department) =>
          department._id === updatedDepartment._id
            ? updatedDepartment
            : department
        )
      );
      toast.success("Department updated successfully");
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating department:", error.message);
      toast.error("Failed to update department");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-5">Departments List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department._id}>
              <td>{department._id}</td>
              <td>{department.name}</td>
              <td>
                <Button
                  className="mr-2"
                  variant="danger"
                  onClick={() => handleDelete(department._id)}
                >
                  Delete
                </Button>
                <Button
                  className="mr-2"
                  variant="success"
                  onClick={() => handleOpenUpdateModal(department)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleOpenAddModal}>
        Add department
      </Button>{" "}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formDepartmentName">
            <Form.Label>Department Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department name"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddDepartment}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formDepartmentName">
            <Form.Label>Department Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department name"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateDepartment}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default DepartmentScreen;
