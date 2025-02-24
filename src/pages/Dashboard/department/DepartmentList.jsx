import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import DepartmentForm from "./DepartmentForm";
import Swal from "sweetalert2";
import {
  getpaginatedDepartments,
  deleteDepartment,
} from "../../../services/DepartmentService";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentPage, setDepartmentPage] = useState(0);
  const [departmentPageSize, setDepartmentPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, [departmentPage, departmentPageSize]);

  const fetchDepartments = () => {
    getpaginatedDepartments(departmentPage, departmentPageSize).then(
      (response) => {
        const data = response.data;
        setDepartments(data.content);
        setTotalPages(data.totalPages);
      }
    );
  };

  const handleDeleteDepartment = (departmentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDepartment(departmentId).then(() => {
          const newPage =
            departments.length === 1 && departmentPage > 0
              ? departmentPage - 1
              : departmentPage;
          setDepartmentPage(newPage);
          fetchDepartments();
          Swal.fire("Deleted!", "The department has been deleted.", "success");
        });
      }
    });
  };

  return (
    <div
      className="container mt-4"
      style={{ maxWidth: "900px", margin: "auto" }}
    >
      <div className="card shadow-lg p-4">
        <div className="d-flex justify-content-between mb-3">
          <h3 className="fw-bold text-primary">Departments</h3>
          <button
            className="btn btn-primary"
            onClick={() => {
              setSelectedDepartment(null);
              setShowModal(true);
            }}
          >
            <FaPlus /> Add Department
          </button>
        </div>

        <div className="table-responsive rounded">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>SNO</th>
                <th>Name</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.length > 0 ? (
                departments.map((department, index) => (
                  <tr key={department.id}>
                    <td>{departmentPage * departmentPageSize + index + 1}</td>
                    <td>{department.name}</td>
                    <td>{department.location}</td>
                    <td>
                      <FaEdit
                        className="text-secondary me-2 cursor-pointer"
                        title="Edit"
                        style={{ fontSize: "16px" }}
                        onClick={() => {
                          setSelectedDepartment(department);
                          setShowModal(true);
                        }}
                      />
                      <FaTrashAlt
                        className="text-secondary me-2 cursor-pointer"
                        title="Delete"
                        onClick={() => handleDeleteDepartment(department.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{ textAlign: "center", color: "#777" }}
                  >
                    No departments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="d-flex align-items-center">
            <label className="me-2 fw-bold">Page size:</label>
            <select
              className="form-select form-select-sm"
              value={departmentPageSize}
              onChange={(e) => {
                setDepartmentPageSize(parseInt(e.target.value, 10));
                setDepartmentPage(0);
              }}
              style={{ width: "80px", fontSize: "14px" }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div>
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => setDepartmentPage(departmentPage - 1)}
              disabled={departmentPage === 0}
            >
              Prev
            </button>

            <button
              className="btn btn-outline-secondary ms-2"
              onClick={() => setDepartmentPage(departmentPage + 1)}
              disabled={departmentPage >= totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <DepartmentForm
          department={selectedDepartment}
          onClose={() => setShowModal(false)}
          refreshDepartments={fetchDepartments}
        />
      )}
    </div>
  );
};

export default DepartmentList;
