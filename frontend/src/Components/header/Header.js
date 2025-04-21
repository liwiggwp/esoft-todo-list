import * as React from "react";
import {
  Button,
  Container,
  Menu,
  MenuItem,
  Typography,
  Toolbar,
  Box,
  AppBar,
  Avatar,
} from "@mui/material";
import Api from "../../Services/ApiServices";

export default function Header({ onFormOpen }) {
  const { token, logout } = Api();
  const user = JSON.parse(localStorage.getItem("user"));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (token !== undefined) {
      logout();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#161616" }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h6">To-do list</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {user && (
                <>
                  <Avatar sx={{ cursor: "pointer" }} onClick={handleMenuOpen}>
                    {user.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                  </Menu>
                </>
              )}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0095FF",
                  borderRadius: "10px",
                }}
                onClick={onFormOpen}
              >
                Новая задача
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
