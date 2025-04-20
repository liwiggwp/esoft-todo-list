import React from "react";
import { Typography } from "@mui/material";
import CardTask from "./CardTask";
import { groupTasksByDate } from "../../Utils/TaskUtils";
import DateTaskList from "./DateTaskList";
import ResponTaskList from "./ResponTaskList";

export default function ListTask({ tasks, typeGroup }) {
  if (!tasks) {
    return <Typography>Загрузка задач...</Typography>;
  }
  if (typeGroup === "date") {
    const taskArray = Array.isArray(tasks)
      ? tasks
      : Object.values(tasks).flat();
    const { todayTasks, weekTasks, futureTasks } = groupTasksByDate(taskArray);
    return (
      <DateTaskList
        todayTasks={todayTasks}
        weekTasks={weekTasks}
        futureTasks={futureTasks}
      />
    );
  }
  if (typeGroup === "responsible") {
    return <ResponTaskList tasks={tasks} />;
  }
  if (typeGroup === "all") {
    const taskArray = Array.isArray(tasks)
      ? tasks
      : Object.values(tasks).flat();

    return (
      <>
        <Typography variant="h6" sx={{ mt: 2, mb: 2, fontWeight: "bold" }}>
          Все задачи
        </Typography>
        {taskArray.map((task) => (
          <CardTask key={task.id} task={task} />
        ))}
      </>
    );
  }
  return null;
}
