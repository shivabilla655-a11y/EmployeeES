import axiosInstance from "../api/axios";

const API = `http://localhost:5000/api`;

// Get all departments
export const departmentService = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(
      API + `/department`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching Department:", error);
    throw error;
  }
};

// Add department
export const addDepartmentService = async (departmentName) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post(
      API + `/department`,
      {
        departmentName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error adding Department:", error);
    throw error;
  }
};

// Update department
export const updateDepartmentService = async (
  departmentId,
  departmentName
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.put(
      API + `/department/${departmentId}`,
      {
        departmentName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating Department:", error);
    throw error;
  }
};

// Delete department
export const deleteDepartmentService = async (departmentId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.delete(
      API + `/department/${departmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error deleting Department:", error);
    throw error;
  }
};