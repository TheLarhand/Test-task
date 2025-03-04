import api from "../../axiosConfig";
import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", { email, password });
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

export const getInfo = async () => {
  try {
    const response = await api.get("/info");
    return response.data;
  } catch (error) {
    throw new Error("GetInfo failed");
  }
}

export const getUserName = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found in localStorage");
    return;
}

try {
    const response = await api.get(`/profile?token=${token}`);
    if (response.data.success) {
        return response.data;
    }
    return response.data;
} catch (error) {
    console.error("GetUserInfo failed", error);
    throw new Error("GetUserInfo failed");
}
}

export const getAuthor = async (signal?: AbortSignal) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found in localStorage");
    return;
  }

  try {
    const response = await api.get(`/author?token=${token}`, { signal });
    if (response.data.success) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.warn("GetAuthor request cancelled");
    } else {
      console.error("GetAuthor failed", error);
    }
    throw new Error("GetAuthor failed");
  }
};

export const getQuote = async (authorId: number, signal?: AbortSignal) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found in localStorage");
    return;
  }

  try {
    const response = await api.get(`/quote?token=${token}&authorId=${authorId}`, { signal });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.warn("GetQuote request cancelled");
    } else {
      console.error("GetQuote failed", error);
    }
    throw new Error("GetQuote failed");
  }
};


