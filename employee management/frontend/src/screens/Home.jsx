import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

// Import images using require
import empImage from "../assets/emp.png";
import deptImage from "../assets/depart.png";

const Home = () => {
  return (
    <div className="container mt-md-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <Card style={{ width: "23rem" }}>
            <Card.Img variant="top" src={empImage} alt="Employees" />
            <Card.Body>
              <Card.Title>Employees</Card.Title>
              <Card.Text>Employees management</Card.Text>
              <Link to="/employees">
                {" "}
                <Button variant="primary">Explore</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6 mb-4">
          <Card style={{ width: "23rem" }}>
            <Card.Img variant="top" src={deptImage} alt="Departments" />
            <Card.Body>
              <Card.Title>Departments</Card.Title>
              <Card.Text>Departments management</Card.Text>
              <Link to="/departments">
                {" "}
                <Button variant="primary">Explore</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
