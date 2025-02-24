import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";
import {
  addDepartment,
  updateDepartment,
} from "../../../services/DepartmentService";
import styles from "../../../styles/Form.module.css";

const DepartmentForm = ({ department, onClose, refreshDepartments }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        location: department.location,
      });
    }
  }, [department]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location) {
      Swal.fire("Validation Error", "All fields are required!", "warning");
      return;
    }

    
    if (department) {
      await updateDepartment(department.id, formData);
      Swal.fire("Success", "Department updated successfully!", "success");
    } else {
      await addDepartment(formData);
      Swal.fire("Success", "Department added successfully!", "success");
    }

    refreshDepartments();
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="text-primary">
            {department ? "Edit Department" : "Add Department"}
          </h3>
          <button className="btn btn-outline-secondary" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Department
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter department"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;
