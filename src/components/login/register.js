import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../utility/loader";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
export const Register = () => {
  const apiURL = "https://googlesheets-backend.herokuapp.com/";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loader, setLoader] = useState(false);
  async function handleRegister(e) {
    setLoader(true);
    e.preventDefault();
    const response = await fetch(`${apiURL}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        password,
      }),
    });

    const data = await response.json();
    setLoader(false);
    if (data.status === "ok") {
      navigate("/");
    } else {
      alert(data.message);
    }
  }
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Loader isVisible={loader} />
      <Grid item component='main' xs={10} md={5} sx={{p:1}}>
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
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleRegister}
            sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                  fullWidth
                  id='firstName'
                  label='Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  id='username'
                  label='Username'
                  autoComplete='username'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container>
            <Grid item>
              <Link href='/' variant='body2'>
                {"Log in"}
              </Link>
            </Grid>
          </Grid>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};
