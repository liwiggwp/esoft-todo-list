import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Button,
} from "@mui/material";
import FormTask from "./FormTask";

export default function CardTask({ task }) {
  const [isFormOpen, setFormOpen] = useState(false);

  const handleOpenForm = () => {
    setFormOpen(true);
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
          >
            {task.title}
            <Chip label={task.priority} size="small" />
          </Typography>
          <Grid container spacing={1} alignItems="center">
            <Grid>
              <Typography variant="body2" component="span">
                До: {new Date(task.end_date).toISOString().split("T")[0]}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" component="span">
                Ответственный: {task.responsible}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" component="span">
                Статус: <Chip label={task.status} size="small" />
              </Typography>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleOpenForm}
          >
            Редактировать
          </Button>
        </CardContent>
      </Card>
      {isFormOpen && (
        <FormTask
          open={isFormOpen}
          onClose={handleCloseForm}
          initialData={task}
        />
      )}
    </>
  );
}
