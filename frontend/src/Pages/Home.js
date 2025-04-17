import React from "react";
import { Container } from "@mui/material";
import Header from "../Components/header/Header";
import ListTask from "../Components/task/ListTask";

export default function Home() {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <ListTask />
      </Container>
    </>
  );
}
