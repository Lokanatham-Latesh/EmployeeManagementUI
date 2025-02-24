import { describe, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/common/Navbar";

describe("Navbar Component", () => {
  let mockLogout;

  beforeEach(() => {
    vi.clearAllMocks(); 
    mockLogout = vi.fn();
  });

  it("renders navbar links correctly", () => {
    render(
      <MemoryRouter>
        <Navbar onLogout={mockLogout} />
      </MemoryRouter>
    );

    expect(screen.getByText("Employee Management System")).toBeInTheDocument();
    expect(screen.getByText("Employees")).toBeInTheDocument();
    expect(screen.getByText("Departments")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
