import {
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE,
} from "../constants/employeeConstants.js";

const initialState = {
  employees: [],
  employee: null,
  loading: false,
  error: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.payload,
        loading: false,
        error: null,
      };
    case GET_EMPLOYEES_FAILURE:
      return {
        ...state,
        employees: [],
        loading: false,
        error: action.payload,
      };
    case GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employee: action.payload,
        loading: false,
        error: null,
      };
    case GET_EMPLOYEE_FAILURE:
      return {
        ...state,
        employee: null,
        loading: false,
        error: action.payload,
      };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.payload],
        loading: false,
        error: null,
      };
    case ADD_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee
        ),
        loading: false,
        error: null,
      };
    case UPDATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;
