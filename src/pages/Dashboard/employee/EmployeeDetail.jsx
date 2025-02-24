import React from "react";
import styles from "../../../styles/EmployeeDetail.module.css";

const EmployeeDetail = ({ employee, onClose }) => {
  if (!employee) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.detailCard} onClick={(e) => e.stopPropagation()}>
        <h2 className="text-primary">Employee Details</h2>

        <p>
          <strong>Name:</strong> {employee.name}
        </p>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Salary:</strong> {employee.salary}
        </p>
        <p>
          <strong>Date of Joining:</strong>
          {employee.dateOfJoining.split("-").reverse().join("-")}
        </p>
        <p>
          <strong>Departments:</strong>{" "}
          {employee.departments && employee.departments.length > 0
            ? employee.departments.map((dept) => dept.name).join(", ")
            : "Not Assigned"}
        </p>
        <button className="btn btn-secondary mt-3 mr-2" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetail;
