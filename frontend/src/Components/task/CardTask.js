import { Typography, Card, CardContent, Chip, Grid } from "@mui/material";

export default function CardTask({ task }) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          color={
            task.status === "выполнена"
              ? "green"
              : new Date(task.end_date) < new Date()
              ? "red"
              : "grey"
          }
          t
        >
          {task.title}
          <Chip label={task.priority} size="small" />
        </Typography>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Typography variant="body2">До: {task.end_date}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              Ответственный: {task.responsible}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              Статус: <Chip label={task.status} size="small" />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
