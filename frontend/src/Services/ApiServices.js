import httpService from "./HttpServices";
import { useState, useEffect } from "react";

export default function ApiServices() {
  const { get } = httpService();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(null);

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

  useEffect(() => {
    getTasks();
  }, []);

  return {
    getTasks,
    getTaskById,
    tasks,
    task,
  };
}
