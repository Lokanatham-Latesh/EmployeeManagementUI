import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  getEmployees,
  getEmployeeDetails,
  deleteEmployee,
} from "../../../services/EmployeeService";
import { getDepartments } from "../../../services/DepartmentService";

import { FaEdit, FaTrashAlt, FaEye, FaPlus } from "react-icons/fa";
import EmployeeForm from "./EmployeeForm";
import EmployeeDetail from "./EmployeeDetail";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchEmployees(currentPage, pageSize);
    fetchDepartments();
  }, [currentPage, pageSize]);

  const fetchEmployees = async (page, size) => {
    const response = await getEmployees(page, size);
    const data = response.data;

    setEmployees(data.content);
    setTotalPages(data.totalPages);
  };

  const fetchDepartments = async () => {
    const response = await getDepartments();
    setDepartments(response.data);
  };

  const handleDeleteEmployee = (employeeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(employeeId)
          .then(() => {
            setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
            fetchEmployees(currentPage, pageSize);
            Swal.fire("Deleted!", "The employee has been deleted.", "success");
          })
          .catch(() =>
            Swal.fire("Error!", "Failed to delete employee.", "error")
          );
      }
    });
  };

  const handleViewEmployee = async (employeeId) => {
    const response = await getEmployeeDetails(employeeId);
    setSelectedEmployee(response.data);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
    fetchEmployees(currentPage, pageSize);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedEmployee(null);
  };

  const handleEditEmployee = async (employeeId) => {
    const response = await getEmployeeDetails(employeeId);
    setSelectedEmployee(response.data);
    setShowModal(true);
  };

  return (
    <div
      className="container mt-4"
      style={{
        maxWidth: "900px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div className="card shadow-lg p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold text-primary">Employees</h3>
          <button
            className="btn btn-primary"
            onClick={() => {
              setSelectedEmployee(null);
              setShowModal(true);
            }}
          >
            <FaPlus /> Add Employee
          </button>
        </div>

        <div className="table-responsive rounded">
          <table className="table table-hover ">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Salary</th>
                <th>DateOfJoining</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.salary}</td>
                    <td>
                      {employee.dateOfJoining.split("-").reverse().join("-")}
                    </td>
                    <td>
                      <FaEye
                        className="text-primary me-2 cursor-pointer"
                        aria-label="view-icon"
                        onClick={() => handleViewEmployee(employee.id)}
                      />
                      <FaEdit
                        className="text-secondary me-2 cursor-pointer"
                        aria-label="edit-icon"
                        onClick={() => handleEditEmployee(employee.id)}
                      />
                      <FaTrashAlt
                        className="text-danger me-2 cursor-pointer"
                        aria-label="delete-icon"
                        onClick={() => handleDeleteEmployee(employee.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", color: "#777" }}
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="d-flex align-items-center">
            <label className="me- fw-bold">Page size:</label>
            <select
              className="form-select"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              style={{ width: "80px" }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div>
            <button
              className="btn btn-outline-secondary me-2"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            <button
              className="btn btn-outline-secondary ms-2"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <EmployeeForm
          employee={selectedEmployee}
          departments={departments}
          onClose={handleCloseModal}
        />
      )}

      {showDetailModal && selectedEmployee && (
        <EmployeeDetail
          employee={selectedEmployee}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default EmployeeList;
