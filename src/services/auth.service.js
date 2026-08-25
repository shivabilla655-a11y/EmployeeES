import api from "../api/axios"; 

const register = async (userData) => {
    try{
        const response = await api.post("/auth/register", userData);
        return response.data;   
    }catch (error) {
        throw new Error(error.response.data.message || "Registration failed");
    }
};

const login = async (userData) => {
    try{
        const response = await api.post("/auth/login", userData);
        return response.data;   
    }catch (error) {
        throw new Error(error.response.data.message || "Login failed");
    }
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

const authService = {
    register,
    login
};
export default authService;