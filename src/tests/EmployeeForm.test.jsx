import { render, screen } from "@testing-library/react";
import EmployeeForm from "../pages/Dashboard/employee/EmployeeForm";
import { describe, it, expect, vi } from "vitest";

describe("EmployeeForm Component", () => {
  it("renders the form with the correct structure", () => {
   
    render(
      <EmployeeForm employee={null} departments={[]} onClose={() => {}} />
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/salary/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of joining/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/departments/i)).toBeInTheDocument();

   
    expect(screen.getByText(/save/i)).toBeInTheDocument();
  });
});
