import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from '../contexts/AuthContext';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";



// Schema for login form
const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).max(24).required("Password is required")
})

export default function Login() {
  // login,and formstate: { errors } are for yup validation
  const { login, control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: "all"
  });

  const history = useHistory();
  const { loginFirebase, currentUser } = useAuth()


  const onSubmit = async (data) => {
    console.log(currentUser)
    await loginFirebase(data.email, data.password)
    history.push("/admin")
    reset()
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
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
          <Typography component="h1" variant="h5" color="white">
            Sign in
          </Typography>
          <Typography component="h4" variant="string">
            {currentUser && `Current User is: ${currentUser?.email}`}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >

            <Controller
              name="email"
              defaultValue=""
              control={control}
              ref={login}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  sx={{input: {color: 'white'}}}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  margin="normal"
                  required
                  label="Email Address"
                  fullWidth
                  id="email"
                //   autoFocus
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              ref={login}
              // {...login('password')}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  sx={{input: {color: 'white'}}}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            //   disabled={!formState.isValid}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
