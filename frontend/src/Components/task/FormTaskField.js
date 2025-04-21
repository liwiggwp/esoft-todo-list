import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { formatDate } from "../../Utils/DateFormat";
export default function TaskFormFields({
  formData,
  handleChange,
  statuses,
  priorities,
  responsible,
  isEditing,
  isNotAuthor,
}) {
  return (
    <>
      <TextField
        fullWidth
        margin="dense"
        label="Заголовок"
        name="title"
        value={formData.title}
        onChange={handleChange}
        disabled={isNotAuthor}
        required
      />
      <TextField
        fullWidth
        margin="dense"
        label="Описание"
        name="description"
        value={formData.description}
        onChange={handleChange}
        disabled={isNotAuthor}
        multiline
        rows={4}
      />
      <TextField
        fullWidth
        margin="dense"
        label="Дата окончания"
        name="end_date"
        type="datetime-local"
        value={formatDate(formData.end_date)}
        onChange={handleChange}
        disabled={isNotAuthor}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        select
        fullWidth
        margin="dense"
        label="Приоритет"
        name="priority"
        value={formData.priority}
        disabled={isNotAuthor}
        onChange={handleChange}
      >
        {priorities.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
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
          <MenuItem key={option.id} value={option.id}>
            {option.name}
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
          <MenuItem key={option.id} value={option.id}>
            {option.responsible}
          </MenuItem>
        ))}
      </TextField>
      {isEditing && (
        <>
          <TextField
            fullWidth
            margin="dense"
            label="Дата создания"
            value={formatDate(formData.created_at)}
            InputProps={{ readOnly: true }}
            disabled
          />
          <TextField
            fullWidth
            margin="dense"
            label="Дата обновления"
            value={formatDate(formData.updated_at)}
            InputProps={{ readOnly: true }}
            disabled
          />
        </>
      )}
    </>
  );
}
