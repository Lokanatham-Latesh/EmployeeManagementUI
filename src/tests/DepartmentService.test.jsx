import {
  getDepartments,
  getPaginatedDepartments,
  deleteDepartment,
  addDepartment,
  updateDepartment,
  mockHttp,
  DEPARTMENT_API, 
} from "../mocks/MockDepartmentService";
import { vi } from "vitest";

describe("Department Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should fetch all departments", async () => {
    const mockData = [
      { id: 1, name: "HR" },
      { id: 2, name: "IT" },
    ];
    mockHttp.get.mockResolvedValue({ data: mockData });

    const response = await getDepartments();
    expect(mockHttp.get).toHaveBeenCalledWith(DEPARTMENT_API);
    expect(response.data).toEqual(mockData);
  });

  test("should fetch paginated departments", async () => {
    const mockData = { content: [{ id: 1, name: "HR" }], totalPages: 2 };
    mockHttp.get.mockResolvedValue({ data: mockData });

    const response = await getPaginatedDepartments(1, 5);
    expect(mockHttp.get).toHaveBeenCalledWith(
      `${DEPARTMENT_API}/paginated?page=1&size=5`
    );
    expect(response.data).toEqual(mockData);
  });

  test("should delete a department", async () => {
    mockHttp.delete.mockResolvedValue({ status: 200 });

    const response = await deleteDepartment(1);
    expect(mockHttp.delete).toHaveBeenCalledWith(`${DEPARTMENT_API}/1`);
    expect(response.status).toBe(200);
  });

  test("should add a new department", async () => {
    const newDepartment = { name: "Finance" };
    mockHttp.post.mockResolvedValue({ data: newDepartment });

    const response = await addDepartment(newDepartment);
    expect(mockHttp.post).toHaveBeenCalledWith(DEPARTMENT_API, newDepartment);
    expect(response.data).toEqual(newDepartment);
  });

  test("should update a department", async () => {
    const updatedDepartment = { name: "Operations" };
    mockHttp.put.mockResolvedValue({ data: updatedDepartment });

    const response = await updateDepartment(1, updatedDepartment);
    expect(mockHttp.put).toHaveBeenCalledWith(
      `${DEPARTMENT_API}/1`,
      updatedDepartment
    );
    expect(response.data).toEqual(updatedDepartment);
  });
});
