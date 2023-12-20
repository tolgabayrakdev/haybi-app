import React, { useState } from "react";
import { Grid, Box, Card, Button, TextField, Divider, Alert, Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import GoogleIcon from '@mui/icons-material/Google';

const backendUrlPrefix = import.meta.env.VITE_BACKEND_URL_PREFIX

const schema = z.object({
  email: z.string().email({ message: "Geçersiz email adresi" }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır" }),
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = useState(false);

  const navigate = useNavigate();

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClose2 = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleSubmit = async (formData: { email: string, password: string }) => {

    const result = await fetch(backendUrlPrefix + "/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({ email: formData.email, password: formData.password })
    })
    console.log(result);
    if (result.status === 200) {
      console.log("Form gönderildi!");
      setOpen2(true);
      navigate("/dashboard/app")
    } else {
      console.log("Login is not successful");
      setOpen(true);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const googleAuthUrl = 'https://accounts.google.com/o/oauth2/auth';
      const redirectUri = 'http://localhost:5173'; // İsteğin yönlendirileceği URI'yi buraya girin
      const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID; // Google API'den alacağınız kimlik bilgilerini buraya ekleyin.
      const scope = 'email profile'; // İstediğiniz kapsamları burada belirleyin

      const authUrl = `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

      window.location.href = authUrl;
    } catch (error) {
      console.error('Google login error:', error);
    }
  };


  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      email: email.trim(),
      password: password.trim(),
    };

    const validationResult = schema.safeParse(formData);

    if (!validationResult.success) {
      const errors: any = validationResult.error.flatten();
      setEmailError(errors.fieldErrors.email);
      setPasswordError(errors.fieldErrors.password);
    } else {
      setEmailError("");
      setPasswordError("");
      handleSubmit(formData);
    }
  };



  return (
    <>
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Snackbar
          open={open}
          autoHideDuration={1000}
          message="Ups, can not login!"
          onClose={handleClose}
        />


        <Snackbar
          open={open2}
          autoHideDuration={1000}
          onClose={handleClose2}
        >
          <Alert severity="success">Log in successful.</Alert>
        </Snackbar>

        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                {/* Logo veya başlık bileşeni */}
              </Box>

              <form onSubmit={handleFormSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  type="email"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
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
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 1 }}
                >
                  Sign In
                </Button>

                <Button onClick={handleGoogleLogin} variant="outlined" startIcon={< GoogleIcon />}>
                  Google
                </Button>
                <Divider className="p-1" />

                <Grid className="mt-3" container>
                  <Grid item xs>
                    <Link className="hover:underline italic text-blue-500" to="/auth/reset-password">Forget password?</Link>
                  </Grid>
                  <Grid item>
                    <Link className="hover:underline italic text-blue-500" to="/auth/register">Create Account</Link>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
