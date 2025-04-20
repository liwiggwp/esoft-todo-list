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
import Api from "../../Services/ApiServices";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register } = Api();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await register(username, password, firstName, lastName);
      if (response.status === 200) {
        navigate("/auth/login");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
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
            label="Имя"
            variant="outlined"
            margin="dense"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="firstName"
          />
          <TextField
            fullWidth
            label="Фамилия"
            variant="outlined"
            margin="dense"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="lastName"
          />
          <TextField
            fullWidth
            label="Логин"
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
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
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
