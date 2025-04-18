import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

const priorities = ["Высокий", "Средний", "Низкий"];
const statuses = ["К выполнению", "Выполняется", "Выполнена", "Отменена"];
const responsible = ["Анна Иванова", "Петр Петров", "Александр Козлов"];

export default function FormTask({ open, onClose, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    end_date: "",
    priority: "",
    status: "К выполнению",
    responsible: "",
    created_at: new Date().toISOString().split("T")[0],
    updated_at: new Date().toISOString().split("T")[0],
    author: "Текущий пользователь",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        end_date: new Date(initialData.end_date).toISOString().split("T")[0],
        created_at: new Date(initialData.created_at)
          .toISOString()
          .split("T")[0],
        updated_at: new Date(initialData.updated_at)
          .toISOString()
          .split("T")[0],
      });
    } else {
      setFormData({
        title: "",
        description: "",
        end_date: "",
        priority: "",
        status: "К выполнению",
        responsible: "",
        created_at: new Date().toISOString().split("T")[0],
        updated_at: new Date().toISOString().split("T")[0],
        author: "Текущий пользователь",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(initialData && {
        updated_at: new Date().toISOString().split("T")[0],
      }),
    }));
  };

  const handleSubmit = () => {
    const resultData = {
      ...formData,
      ...(!initialData && {
        created_at: new Date().toISOString(),
        author: "Текущий пользователь",
      }),
      ...(initialData && { updated_at: new Date().toISOString() }),
    };

    console.log("Отправленные данные:", resultData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? "Редактировать задачу" : "Создать задачу"}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Заголовок"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="dense"
          label="Описание"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Дата окончания"
          name="end_date"
          type="date"
          value={formData.end_date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          select
          fullWidth
          margin="dense"
          label="Приоритет"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          {priorities.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          margin="dense"
          label="Статус"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          {statuses.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          margin="dense"
          label="Ответственный"
          name="responsible"
          value={formData.responsible}
          onChange={handleChange}
        >
          {responsible.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {initialData && (
          <>
            <TextField
              fullWidth
              margin="dense"
              label="Дата последнего обновления"
              value={formData.updated_at}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Дата создания"
              value={formData.created_at}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}
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
