import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./bootstrap.min.css";
import EmployeeScreen from "./screens/EmployeeScreen";
import Header from "./components/Header";
import DepartmentScreen from "./screens/DepartmentScreen";
import Home from "./screens/Home";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<EmployeeScreen />} />
          <Route path="/departments" element={<DepartmentScreen />} />
          
        </Routes>
      </main>
    </Router>
  );
}

export default App;
