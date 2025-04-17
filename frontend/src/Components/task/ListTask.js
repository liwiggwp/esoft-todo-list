import React from "react";
import { Typography } from "@mui/material";
import CardTask from "./CardTask";
import ApiServices from "../../Services/ApiServices";
import { groupTasksByDate } from "../../utils/taskUtils";

export default function ListTask() {
  const { tasks } = ApiServices();
  const { todayTasks, weekTasks, futureTasks } = groupTasksByDate(tasks);

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Сегодня
      </Typography>
      {todayTasks.map((task) => (
        <CardTask key={task.id} task={task} />
      ))}

      <Typography variant="h6" sx={{ mt: 2 }}>
        На этой неделе
      </Typography>
      {weekTasks.map((task) => (
        <CardTask key={task.id} task={task} />
      ))}

      <Typography variant="h6" sx={{ mt: 2 }}>
        Позже
      </Typography>
      {futureTasks.map((task) => (
        <CardTask key={task.id} task={task} />
      ))}
    </>
  );
}
