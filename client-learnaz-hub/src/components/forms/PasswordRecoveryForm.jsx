import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";

const defaultTheme = createTheme();

function PasswordRecoveryForm() {
  const [errMsg, setErrMsg] = useState("");
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiUrl = `${baseUrl}/auth/reset-password/${resetToken}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const passwordResetData = {
      password: data.get("newPassword"),
      confirmPassword: data.get("confirmPassword"),
    };
    try {
      await axios.put(apiUrl, passwordResetData);
      alert("Password reset successful!");
      navigate("/login");
    } catch (error) {
      setErrMsg(error.response.data.message);
    }
  };

  return (
    <section className="mt-28 mb-10">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <div className={`${!errMsg && "invisible"} text-red-400 h-5`}>
              <p>{errMsg}</p>
            </div>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="Enter new password"
                type="password"
                id="newPassword"
                autoComplete="new-password"
                onChange={() => setErrMsg("")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm password"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-password"
                onChange={() => setErrMsg("")}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </section>
  );
}

export default PasswordRecoveryForm;
