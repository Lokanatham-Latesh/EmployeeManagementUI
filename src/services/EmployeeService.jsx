import http from "./http"; 

export const getEmployees = async (page, size) => {
  return await http.get(`/employees/paginated?page=${page}&size=${size}`);
};

export const getEmployeeDetails = async (id) => {
  const response = await http.get(`/employees/with-department/${id}`);
  console.log(response.data);
  return response;
};

export const deleteEmployee = async (id) => {
  return await http.delete(`/employees/${id}`);
};

export const addEmployee = async (employeeData) => {
  return await http.post("/employees", employeeData);
};

export const updateEmployee = async (id, employeeData) => {
  return await http.put(`/employees/${id}`, employeeData);
};
