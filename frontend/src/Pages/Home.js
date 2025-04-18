import React, { useState } from "react";
import { Container } from "@mui/material";
import Header from "../Components/header/Header";
import ListTask from "../Components/task/ListTask";
import FormTask from "../Components/task/FormTask";

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen((prev) => !prev);
  };
  const handleFormClose = () => {
    setFormOpen(false);
  };
  return (
    <>
      <Header onFormOpen={handleFormOpen} />
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <ListTask />
        <FormTask open={formOpen} onClose={handleFormClose} /> 
      </Container>
    </>
  );
}
