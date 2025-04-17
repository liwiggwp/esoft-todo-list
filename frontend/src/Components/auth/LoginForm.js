import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";

export default function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    localStorage.setItem("token", "token");
  };

  return (
    <Dialog open={true} maxWidth="xs" fullWidth>
      <DialogContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Вход
          </Typography>
        </Box>
        <Box mt={2} component="form" onSubmit={handleLogin}>
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
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, p: 1.5 }}
            type="submit"
          >
            Войти
          </Button>
        </Box>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">Нет аккаунта?</Typography>
          <Button
            variant="outlined"
            sx={{ mt: 1, borderRadius: "8px", p: 1 }}
            onClick={() => navigate("/auth/register")}
          >
            Зарегистрироваться
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
