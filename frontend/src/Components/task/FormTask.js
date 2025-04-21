import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import FormTaskField from "./FormTaskField";
import ApiServices from "../../Services/ApiServices";
import { formatDate } from "../../Utils/DateFormat";

export default function FormTask({ open, onClose, initialData }) {
  const { createTask, updateTask, statuses, priorities, responsible } =
    ApiServices();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    end_date: "",
    priority: "",
    status: "",
    responsible: "",
  });

  useEffect(() => {
    if (
      initialData &&
      priorities.length &&
      statuses.length &&
      responsible.length
    ) {
      const getIdByName = (list, name, key = "name") =>
        list.find((item) => item[key] === name)?.id || "";

      setFormData({
        ...initialData,
        priority: getIdByName(priorities, initialData.priority),
        status: getIdByName(statuses, initialData.status),
        responsible: getIdByName(
          responsible,
          initialData.responsible,
          "responsible"
        ),
      });
    }
  }, [initialData, priorities, statuses, responsible]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    setError("");
    try {
      const dataToSend = {
        title: formData.title,
        description: formData.description,
        end_date: formatDate(formData.end_date),
        priority_id: formData.priority,
        status_id: formData.status,
        responsible_id: formData.responsible,
      };

      if (initialData) {
        const response = await updateTask(initialData.id, dataToSend);
        if (response.status === 200) {
          window.location.reload();
          onClose();
        } else {
          setError(response.data.message);
        }
      } else {
        await createTask(dataToSend);
        window.location.reload();
        onClose();
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? "Редактировать задачу" : "Создать задачу"}
      </DialogTitle>
      <DialogContent>
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1,mb:1 }}>
            {error}
          </Typography>
        )}
        <FormTaskField
          formData={formData}
          handleChange={handleChange}
          statuses={statuses}
          priorities={priorities}
          responsible={responsible}
          isEditing={initialData}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {initialData ? "Обновить" : "Создать"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
