import React, { useState, useEffect } from "react";
import { addEmployee, updateEmployee } from "../../../services/EmployeeService";
import Swal from "sweetalert2";
import styles from "../../../styles/Form.module.css";
import { FaTimes } from "react-icons/fa";

const EmployeeForm = ({ employee, departments, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    salary: "",
    dateOfJoining: "",
    departmentNames: [],
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        salary: employee.salary,
        dateOfJoining: employee.dateOfJoining,
        departmentNames: employee.departments.map((dept) => dept.name),
      });
    }
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDepartmentChange = (e) => {
    const { options } = e.target;
    const selectedDepartments = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      departmentNames: selectedDepartments,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    if (employee?.id) {
      response = await updateEmployee(employee.id, formData);
    } else {
      response = await addEmployee(formData);
    }

    if (response?.data) {
      const message = employee?.id
        ? "Employee updated successfully"
        : "Employee added successfully";
      Swal.fire("Success", message, "success");
      onClose();
    } else {
      Swal.fire("Error", "No data received from server", "error");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="text-primary">
            {employee?.id ? "Edit Employee" : "Add Employee"}
          </h3>
          <button className="btn btn-outline-secondary" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder=" Name"
              required
            />
          </div>

          <div className="mb">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
          </div>

          <div className="mb">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <input
              type="number"
              className="form-control"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="Salary"
              required
            />
          </div>

          <div className="mb">
            <label htmlFor="dateOfJoining" className="form-label">
              Date of Joining
            </label>
            <input
              type="date"
              className="form-control"
              id="dateOfJoining"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb">
            <label htmlFor="departments" className="form-label">
              Departments
            </label>
            <select
              id="departments"
              name="departmentNames"
              multiple
              className="form-select"
              value={formData.departmentNames}
              onChange={handleDepartmentChange}
              required
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
