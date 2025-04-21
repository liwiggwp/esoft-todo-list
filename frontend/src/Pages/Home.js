import React, { useState, useEffect } from "react";
import { Button, Container, Box, ButtonGroup } from "@mui/material";
import Header from "../Components/header/Header";
import ListTask from "../Components/task/ListTask";
import FormTask from "../Components/task/FormTask";
import ApiServices from "../Services/ApiServices";

export default function Home() {
  const [typeGroup, setTypeGroup] = useState("date");
  const [formOpen, setFormOpen] = useState(false);
  const { tasks, getTasks } = ApiServices();

  const handleFormOpen = () => {
    setFormOpen((prev) => !prev);
  };
  const handleFormClose = () => {
    setFormOpen(false);
  };

  const fetchTasks = async (groupType) => {
    try {
      await getTasks(groupType);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTypeGroup = (event, typeGroup) => {
    if (typeGroup) {
      setTypeGroup(typeGroup);
      if (typeGroup === "date") fetchTasks("date");
      if (typeGroup === "responsible") fetchTasks("responsible");
      if (typeGroup === "all") fetchTasks("all");
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Header onFormOpen={handleFormOpen} />
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 1 }}>
          <ButtonGroup variant="text" color="inherit">
            <Button onClick={(event) => handleTypeGroup(event, "date")}>
              По дате завершения
            </Button>
            <Button onClick={(event) => handleTypeGroup(event, "responsible")}>
              По ответственным
            </Button>
            <Button onClick={(event) => handleTypeGroup(event, "all")}>
              Все задачи
            </Button>
          </ButtonGroup>
        </Box>
        <ListTask tasks={tasks} typeGroup={typeGroup} />
        <FormTask open={formOpen} onClose={handleFormClose} />
      </Container>
    </>
  );
}
