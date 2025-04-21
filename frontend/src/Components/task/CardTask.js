import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Button,
} from "@mui/material";
import FormTask from "./FormTask";
import { priorityColor, statusColor } from "../../Utils/ColorChip";
import { formatDate } from "../../Utils/DateFormat";

export default function CardTask({ task }) {
  const [isFormOpen, setFormOpen] = useState(false);
  const [initialFormData, setInitialFormData] = useState(null);

  const handleEdit = () => {
    const formattedData = {
      ...task,
    };

    setFormOpen(true);
    setInitialFormData(formattedData);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  return (
    <>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography
            variant="h6"
            color={
              task.status === "Выполнена"
                ? "green"
                : new Date(task.end_date) < new Date()
                ? "red"
                : "grey"
            }
            sx={{ fontWeight: "bold", fontSize: "1rem" }}
          >
            {task.title}
          </Typography>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                До:
              </Typography>
              <Typography variant="body2">
                {formatDate(task.end_date)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Ответственный:
              </Typography>
              <Typography variant="body2">{task.responsible}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Приоритет:
              </Typography>
              <Chip
                label={task.priority}
                size="small"
                color={priorityColor(task.priority)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Статус:
              </Typography>
              <Chip
                label={task.status}
                size="small"
                color={statusColor(task.status)}
              />
            </Grid>
            <Grid item sx={{ ml: "auto" }}>
              <Button variant="outlined" color="primary" onClick={handleEdit}>
                Открыть
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {isFormOpen && (
        <FormTask
          open={isFormOpen}
          onClose={handleCloseForm}
          initialData={initialFormData}
        />
      )}
    </>
  );
}
