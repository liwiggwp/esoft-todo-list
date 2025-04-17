import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={true} maxWidth="xs" fullWidth>
      <DialogContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Регистрация
          </Typography>
        </Box>
        <Box mt={2} component="form" onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Почта"
            variant="outlined"
            margin="dense"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            variant="outlined"
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, p: 1.5 }}
            type="submit"
          >
            Зарегистрироваться
          </Button>
        </Box>
        <Box mt={3} textAlign="center">
          <Typography variant="body2">Уже есть аккаунт?</Typography>
          <Button
            variant="outlined"
            sx={{ mt: 1, borderRadius: "8px", p: 1 }}
            onClick={() => navigate("/auth/login")}
          >
            Войти
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
