import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const API = "https://employee-performance-system-up7o.onrender.com";

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: ""
  });

  const [employees, setEmployees] = useState([]);

  const [department, setDepartment] =
    useState("");

  const [aiResults, setAiResults] =
    useState([]);


// Fetch Employees
  const fetchEmployees = async () => {

    const res = await axios.get(
      `${API}/api/employees`
    );

    setEmployees(res.data);

  };


  useEffect(() => {

    fetchEmployees();

  }, []);


// Add Employee
  const addEmployee = async () => {

    try {

      await axios.post(
        `${API}/api/employees`,
        {
          ...employee,

          skills:
            employee.skills.split(","),

          performanceScore:
            Number(employee.performanceScore),

          experience:
            Number(employee.experience)
        }
      );

      alert("Employee Added");

      fetchEmployees();

      setEmployee({
        name: "",
        email: "",
        department: "",
        skills: "",
        performanceScore: "",
        experience: ""
      });

    } catch (error) {

      console.log(error);

    }

  };


// Search Employee
  const searchEmployee = async () => {

    const res = await axios.get(
`${API}/api/employees/search?department=${department}`
    );

    setEmployees(res.data);

  };


// AI Recommendation
  const aiRecommendation = async () => {

    const res = await axios.post(
      `${API}/api/ai/recommend`
    );

    setAiResults(res.data);

  };



  return (

    <div className="container">

      <h1>
        AI Employee Performance Analytics
      </h1>


{/* Employee Form */}

      <div className="card">

        <h2>Employee Registration</h2>

        <input
          type="text"
          placeholder="Employee Name"
          value={employee.name}
          onChange={(e) =>
            setEmployee({
              ...employee,
              name: e.target.value
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={employee.email}
          onChange={(e) =>
            setEmployee({
              ...employee,
              email: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Department"
          value={employee.department}
          onChange={(e) =>
            setEmployee({
              ...employee,
              department: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Skills (React,Node.js)"
          value={employee.skills}
          onChange={(e) =>
            setEmployee({
              ...employee,
              skills: e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Performance Score"
          value={employee.performanceScore}
          onChange={(e) =>
            setEmployee({
              ...employee,
              performanceScore: e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Experience"
          value={employee.experience}
          onChange={(e) =>
            setEmployee({
              ...employee,
              experience: e.target.value
            })
          }
        />

        <button onClick={addEmployee}>
          Add Employee
        </button>

      </div>



{/* Search Section */}

      <div className="card">

        <h2>Search & Filter</h2>

        <input
          type="text"
          placeholder="Search by Department"
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
        />

        <button onClick={searchEmployee}>
          Search
        </button>

        <button onClick={fetchEmployees}>
          Reset
        </button>

      </div>



{/* Employee List */}

      <div className="card">

        <h2>Employee List</h2>

        {
          employees.map((emp, index) => (

            <div
              className="employee-card"
              key={index}
            >

              <h3>{emp.name}</h3>

              <p>
                <b>Email:</b> {emp.email}
              </p>

              <p>
                <b>Department:</b>
                {emp.department}
              </p>

              <p>
                <b>Skills:</b>
                {emp.skills.join(", ")}
              </p>

              <p>
                <b>Performance Score:</b>
                {emp.performanceScore}
              </p>

              <p>
                <b>Experience:</b>
                {emp.experience} years
              </p>

            </div>

          ))
        }

      </div>



{/* AI Recommendation */}

      <div className="card">

        <h2>AI Recommendations</h2>

        <button onClick={aiRecommendation}>
          Generate AI Recommendation
        </button>

        {
          aiResults.map((item, index) => (

            <div
              className="employee-card"
              key={index}
            >

              <h3>{item.name}</h3>

              <p>
                <b>Department:</b>
                {item.department}
              </p>

              <p>
                <b>Performance Score:</b>
                {item.performanceScore}
              </p>

              <p>
                <b>AI Recommendation:</b>
                {item.recommendation}
              </p>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default App;