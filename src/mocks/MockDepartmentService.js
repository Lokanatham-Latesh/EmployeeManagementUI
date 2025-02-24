import { vi } from "vitest";

export const DEPARTMENT_API = "/departments";

export const mockHttp = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
};

export const getDepartments = async () => {
  return mockHttp.get(DEPARTMENT_API);
};

export const getPaginatedDepartments = async (page, size) => {
  return mockHttp.get(`${DEPARTMENT_API}/paginated?page=${page}&size=${size}`);
};

export const deleteDepartment = async (id) => {
  return mockHttp.delete(`${DEPARTMENT_API}/${id}`);
};

export const addDepartment = async (departmentData) => {
  return mockHttp.post(DEPARTMENT_API, departmentData);
};

export const updateDepartment = async (id, departmentData) => {
  return mockHttp.put(`${DEPARTMENT_API}/${id}`, departmentData);
};
