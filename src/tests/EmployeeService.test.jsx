import {
  getEmployees,
  getEmployeeDetails,
  deleteEmployee,
  addEmployee,
  updateEmployee,
  mockHttp,
  EMPLOYEE_API,
} from "../mocks/MockEmployeeService";

describe("Employee Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should fetch paginated employees", async () => {
    const mockData = { content: [{ id: 1, name: "John Doe" }], totalPages: 2 };
    mockHttp.get.mockResolvedValue({ data: mockData });

    const response = await getEmployees(1, 5);

    expect(mockHttp.get).toHaveBeenCalledWith(EMPLOYEE_API);
    expect(response.data).toEqual(mockData);
  });

  test("should fetch employee details", async () => {
    const mockEmployee = { id: 1, name: "John Doe", department: "Engineering" };
    mockHttp.get.mockResolvedValue({ data: mockEmployee });

    const response = await getEmployeeDetails(1);
    expect(mockHttp.get).toHaveBeenCalledWith(
      `${EMPLOYEE_API}/with-department/1`
    );
    expect(response.data).toEqual(mockEmployee);
  });

  test("should delete an employee", async () => {
    mockHttp.delete.mockResolvedValue({ status: 200 });

    const response = await deleteEmployee(1);
    expect(mockHttp.delete).toHaveBeenCalledWith(`${EMPLOYEE_API}/1`);
    expect(response.status).toBe(200);
  });

  test("should add a new employee", async () => {
    const newEmployee = { name: "Sam Wilson", department: "Finance" };
    mockHttp.post.mockResolvedValue({ data: newEmployee });

    const response = await addEmployee(newEmployee);
    expect(mockHttp.post).toHaveBeenCalledWith(EMPLOYEE_API, newEmployee);
    expect(response.data).toEqual(newEmployee);
  });

  test("should update an employee", async () => {
    const updatedEmployee = { name: "Samuel Wilson", department: "Marketing" };
    mockHttp.put.mockResolvedValue({ data: updatedEmployee });

    const response = await updateEmployee(1, updatedEmployee);
    expect(mockHttp.put).toHaveBeenCalledWith(
      `${EMPLOYEE_API}/1`,
      updatedEmployee
    );
    expect(response.data).toEqual(updatedEmployee);
  });
});
