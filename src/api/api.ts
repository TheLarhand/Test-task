import api from "../../axiosConfig";

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", { email, password });
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const logout = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
      console.error("Token not found in localStorage");
      return;
  }

  try {
      const response = await api.delete(`/logout?token=${token}`);
      console.log(response.data);
      if (response.data.success) {
          localStorage.removeItem("token");
      }
      return response.data;
  } catch (error) {
      console.error("Logout failed", error);
      throw new Error("Logout failed");
  }
};

