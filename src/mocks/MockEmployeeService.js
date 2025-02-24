import { vi } from "vitest";

export const EMPLOYEE_API = "/employees";

export const mockHttp = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
};

export const getEmployees = async () => {
  return mockHttp.get(EMPLOYEE_API);
};

export const getPaginatedEmployees = async (page, size) => {
  return mockHttp.get(`${EMPLOYEE_API}/paginated?page=${page}&size=${size}`);
};

export const getEmployeeDetails = async (id) => {
  return mockHttp.get(`${EMPLOYEE_API}/with-department/${id}`);
};

export const deleteEmployee = async (id) => {
  return mockHttp.delete(`${EMPLOYEE_API}/${id}`);
};

export const addEmployee = async (employeeData) => {
  return mockHttp.post(EMPLOYEE_API, employeeData);
};

export const updateEmployee = async (id, employeeData) => {
  return mockHttp.put(`${EMPLOYEE_API}/${id}`, employeeData);
};
