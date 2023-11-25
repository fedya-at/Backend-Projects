import PropTypes from "prop-types";
import { Button, ButtonGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../actions/employeesAction";

const Employee = ({ employee }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteEmployee(employee._id));
  };

    return (
    
    <tr>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.email}</td>
      <td>{employee.position}</td>
      <td>{employee.department}</td>
      <td>
        <ButtonGroup>
          <Button>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

Employee.propTypes = {
  employee: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
  }).isRequired,
};

export default Employee;
