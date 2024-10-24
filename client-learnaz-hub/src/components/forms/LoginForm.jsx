/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginUser } from "../../slices/loginSlice";
import { ToastContainer, toast } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css";
import { KJUR } from "jsrsasign";

const defaultTheme = createTheme();

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user, status, error } = useSelector((state) => state.login);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const resultAction = await dispatch(loginUser(userData));
    console.log("result:", resultAction);

    if (loginUser.fulfilled.match(resultAction)) {
      const token = resultAction.payload.token;
      console.log("token:", token);
      localStorage.setItem("token", token);

      const decoded = KJUR.jws.JWS.parse(token);
      console.log("decoded token:", decoded.payloadObj);

      // Show success toast notification
      toast.success("Login successful!");

      navigate("/home", {
        state: { id: decoded.payloadObj.id, role: decoded.payloadObj.role },
      });
      setEmail("");
      setPassword("");
    } else {
      setErrMsg(resultAction.payload?.message || "Failed to login");
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <section className="mt-[10rem]">
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
              Sign in
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrMsg("");
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrMsg("");
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!email || !password}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgot-password" variant="body2">
                    <span className="text-blue-500 hover:underline">
                      Forgot password?
                    </span>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account?"}{" "}
                    <span className="text-blue-500 hover:underline">
                      Sign up
                    </span>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <ToastContainer /> {/* Toast container for notifications */}
      </ThemeProvider>
    </section>
  );
}

export default LoginForm;
