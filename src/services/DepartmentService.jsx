import http from "./http";
export const getDepartments = async () => {
  return await http.get("/departments");
};

export const getpaginatedDepartments = async (page, size) => {
  return await http.get(`/departments/paginated?page=${page}&size=${size}`);
};

export const deleteDepartment = async (id) => {
  return await http.delete(`/departments/${id}`);
};

export const addDepartment = async (departmentData) => {
  return await http.post("/departments", departmentData);
};

export const updateDepartment = async (id, departmentData) => {
  return await http.put(`/departments/${id}`, departmentData);
};
