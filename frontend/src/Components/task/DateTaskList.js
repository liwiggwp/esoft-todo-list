import React from "react";
import { Typography } from "@mui/material";
import CardTask from "./CardTask";

export default function DateTaskList({ todayTasks, weekTasks, futureTasks }) {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 2, mb: 2, fontWeight: "bold" }}>
        Сегодня
      </Typography>
      {todayTasks.length > 0 ? (
        todayTasks.map((task) => <CardTask key={task.id} task={task} />)
      ) : (
        <Typography variant="body2" color="textSecondary">
          Нет задач на сегодня
        </Typography>
      )}

      <Typography variant="h6" sx={{ mt: 2, mb: 2, fontWeight: "bold" }}>
        На этой неделе
      </Typography>
      {weekTasks.length > 0 ? (
        weekTasks.map((task) => <CardTask key={task.id} task={task} />)
      ) : (
        <Typography variant="body2" color="textSecondary">
          Нет задач на этой неделе
        </Typography>
      )}

      <Typography variant="h6" sx={{ mt: 2, mb: 2, fontWeight: "bold" }}>
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
