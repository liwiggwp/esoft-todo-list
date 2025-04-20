import React from "react";
import { Typography } from "@mui/material";
import CardTask from "./CardTask";
import ApiServices from "../../Services/ApiServices";
import { groupTasksByDate } from "../../Utils/TaskUtils";

export default function ListTask() {
  const { tasks } = ApiServices();
  const { todayTasks, weekTasks, futureTasks } = groupTasksByDate(tasks);

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Сегодня
      </Typography>
      {todayTasks.length > 0 ? (
        todayTasks.map((task) => <CardTask key={task.id} task={task} />)
      ) : (
        <Typography variant="body2" color="textSecondary">
          Нет задач на сегодня
        </Typography>
      )}

      <Typography variant="h6" sx={{ mt: 2 }}>
        На этой неделе
      </Typography>
      {weekTasks.length > 0 ? (
        weekTasks.map((task) => <CardTask key={task.id} task={task} />)
      ) : (
        <Typography variant="body2" color="textSecondary">
          Нет задач на этой неделе
        </Typography>
      )}

      <Typography variant="h6" sx={{ mt: 2 }}>
        Позже
      </Typography>
      {futureTasks.length > 0 ? (
        futureTasks.map((task) => <CardTask key={task.id} task={task} />)
      ) : (
        <Typography variant="body2" color="textSecondary">
          Нет задач на будущее
        </Typography>
      )}
    </>
  );
}