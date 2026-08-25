import axiosInstance from "../api/axios";


export const dashboardService = async() => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("http://localhost:5000/api/dashboard", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }
};

export default dashboardService;