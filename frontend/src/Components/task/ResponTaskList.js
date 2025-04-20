import React from "react";
import { Typography, Box } from "@mui/material";
import CardTask from "./CardTask";

export default function ResponTaskList({ tasks }) {
  return (
    <>
      {Object.entries(tasks).map(([responsible, taskList]) => (
        <Box key={responsible} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mt: 2, mb: 2, fontWeight: "bold" }}>
            {responsible}
          </Typography>
          {Array.isArray(taskList) &&
            taskList.map((task) => <CardTask key={task.id} task={task} />)}
        </Box>
      ))}
    </>
  );
}
