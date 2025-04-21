import httpService from "./HttpServices";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ApiServices() {
  const navigate = useNavigate();
  const { get, post, put, del } = httpService();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [responsible, setResponsible] = useState([]);

  const handleUnauthorized = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

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

  const getTasks = async (groupBy = "date") => {
    try {
      const queryParam = groupBy ? `?groupBy=${groupBy}` : "";
      const response = await get(`/tasks${queryParam}`);
      setTasks(response.data);
      return response;
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleUnauthorized();
      }
      throw error;
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

  const createTask = async (data) => {
    try {
      const response = await post("/tasks", data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateTask = async (id, data) => {
    try {
      const response = await put(`/tasks/${id}`, data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await del(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getStatuses = async () => {
    try {
      const response = await get("/statuses");
      setStatuses(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getPriorities = async () => {
    try {
      const response = await get("/priorities");
      setPriorities(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getSubordinatesUsers = async () => {
    try {
      const response = await get("/user/subordinates-users");
      setResponsible(response.data);
    } catch (error) {
      console.error(error);
      throw error;
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

  const register = async (username, password, first_name, last_name) => {
    try {
      const response = await post("/auth/register", {
        username,
        password,
        first_name,
        last_name,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  useEffect(() => {
    getTasks();
    getStatuses();
    getPriorities();
    getSubordinatesUsers();
  }, []);

  return {
    setToken: saveToken,
    token,
    user,
    getToken,
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    statuses,
    priorities,
    responsible,
    tasks,
    task,
    login,
    register,
    logout,
  };
}
