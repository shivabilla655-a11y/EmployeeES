import axiosInstance from "../api/axios";

const API = `http://localhost:5000/api`;

export const employeeService = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(API + "/employees", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const addEmployeeService = async (employeeData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.post(
      API + "/employees",
      employeeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

export const updateEmployeeService = async (employeeId, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.put(
      API + `/employees/${employeeId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
      console.error("Error updating employee:", error);
    console.log("Backend response:", error.response?.data);
    throw error;
  }
};

export const deleteEmployeeService = async (employeeId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.delete(
      API + `/employees/${employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

export const GetEmployeeByIdService = async (employeeId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(
      API + `/employees/${employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};
