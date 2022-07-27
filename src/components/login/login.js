import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../utility/loader";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
export const Login = () => {
    const apiURL = "http://localhost:3001/";
    const theme = createTheme();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    async function handleLogin(e) {
        setLoader(true);
        e.preventDefault();
        const response = await fetch(`${apiURL}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const data = await response.json();

        if (data.user) {
        localStorage.setItem("token", data.user);
        navigate("/home");
        } else {
        alert("Please check your username and password");
        }
        setLoader(false);
    }
    useEffect(() => {
      localStorage.removeItem("token");
    }, []);
    return (
      <ThemeProvider theme={theme}>
        <Loader isVisible={loader} />
        <Grid item component='main' xs={10} md={5} sx={{ p: 1 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box
              component='form'
              onSubmit={handleLogin}
              noValidate
              sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                label='Username'
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                label='Password'
                type='password'
                id='password'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href='/register' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </ThemeProvider>
    );
};
