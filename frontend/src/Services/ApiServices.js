import httpService from "./HttpServices";
import { useState, useEffect } from "react";

export default function ApiServices() {
  const { get, post, put, del } = httpService();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(null);

  const getToken = () => {
    return localStorage.getItem("token");
  };
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const saveToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const getTasks = async () => {
    try {
      const response = await get(`/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTaskById = async (id) => {
    try {
      const response = await get(`/tasks/${id}`);
      setTask(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await post("/auth/login", { username, password });
      saveToken(response.data.token);
      saveUser(response.data.user);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      const response = await post("/auth/register", { username, password });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return {
    setToken: saveToken,
    token,
    user,
    getToken,
    getTasks,
    getTaskById,
    tasks,
    task,
    login,
    register,
    logout,
  };
}
