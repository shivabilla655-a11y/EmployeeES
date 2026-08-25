import axiosInstance from "../api/axios.js";

const API = `http://localhost:5000/api`;

// =====================================================
// GET ALL POSITIONS
// =====================================================

export const getAllPositions = async () => {
  try {
    const token = localStorage.getItem("token");

    const result = await axiosInstance.get(
      API + `/position`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return result;
  } catch (error) {
    console.error("Error fetching positions:", error);
    throw error;
  }
};

// =====================================================
// ADD POSITION
// =====================================================

export const addPosition = async (
  positionName,
  description
) => {
  try {
    const token = localStorage.getItem("token");

    const result = await axiosInstance.post(
      API + `/position`,
      {
        positionName: positionName,
        description: description || null,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return result;
  } catch (error) {
    console.error("Error adding position:", error);
    throw error;
  }
};

// =====================================================
// UPDATE POSITION
// =====================================================

export const updatePosition = async (
  positionId,
  positionName,
  description
) => {
  try {
    const token = localStorage.getItem("token");

    const result = await axiosInstance.put(
      API + `/position`,
      {
        positionId : positionId,
        positionName: positionName,
        description: description || null,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return result;
  } catch (error) {
    console.error("Error updating position:", error);
    throw error;
  }
};

// =====================================================
// DELETE POSITION
// =====================================================

export const deletePosition = async (positionId) => {
  try {
    const token = localStorage.getItem("token");

    const result = await axiosInstance.delete(
      API + `/position/${positionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return result;
  } catch (error) {
    console.error("Error deleting position:", error);
    throw error;
  }
};