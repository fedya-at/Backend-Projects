// employeeActions.js

import axios from "axios";

import {
  GET_EMPLOYEES_FAILURE,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE,
} from "../constants/employeeConstants.js";

export const getEmployees = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/employees");
    dispatch({
      type: GET_EMPLOYEES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_EMPLOYEES_FAILURE,
      payload: error.response.data.error,
    });
  }
};

export const getEmployeeById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/employees/${id}`);
    dispatch({
      type: GET_EMPLOYEE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_EMPLOYEE_FAILURE,
      payload: error.response.data.error,
    });
  }
};

export const addEmployee = (employeeData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/employees", employeeData);
    dispatch({
      type: ADD_EMPLOYEE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_EMPLOYEE_FAILURE,
      payload: error.response.data.error,
    });
  }
};

export const updateEmployee = (id, employeeData) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/employees/${id}`, employeeData);
    dispatch({
      type: UPDATE_EMPLOYEE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EMPLOYEE_FAILURE,
      payload: error.response.data.error,
    });
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/employees/${id}`);
    dispatch({
      type: DELETE_EMPLOYEE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EMPLOYEE_FAILURE,
      payload: error.response.data.error,
    });
  }
};
