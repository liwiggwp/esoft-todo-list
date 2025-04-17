import { Typography, Card, CardContent, Chip, Grid } from "@mui/material";

export default function CardTask({ task }) {
  return (
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
              До: {task.end_date}
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
      </CardContent>
    </Card>
  );
}