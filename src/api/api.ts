import api from "../../axiosConfig";

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
