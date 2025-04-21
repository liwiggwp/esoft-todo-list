import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Grid } from "@mui/material";

export default function Error404() {
  return (
    <Grid
      container
      spacing={3}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", textAlign: "center" }}
    >
      <Grid item>
        <Typography
          variant="h1"
          style={{ fontWeight: "bold", fontSize: "6rem" }}
        >
          404
        </Typography>
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Страница не найдена
        </Typography>
      </Grid>
      <Grid item>
        <Link style={{ color: "black",  }} to="/">
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Вернуться на главную
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
}
