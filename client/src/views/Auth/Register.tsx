import React, { ChangeEvent, useState } from "react";
import { Grid, Box, Card, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Geçersiz email adresi" }),
  password: z.string().min(8, { message: "Şifre en az 8 karakter olmalıdır." }),
  firstName: z.string().nonempty({ message: "Boş olamaz " }).min(3, { message: "Adınız en az 3 karakter olmalıdır." }),
  lastName: z.string().min(3, { message: "Soyadınız en az 3 karakter olmalıdır." })
});

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");



  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      email: email.trim(),
      password: password.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim()
    };

    const validationResult = schema.safeParse(formData);

    if (!validationResult.success) {
      const errors: any = validationResult.error.flatten();
      console.log(errors);

      setEmailError(errors.fieldErrors.email);
      setPasswordError(errors.fieldErrors.password);
      setFirstNameError(errors.fieldErrors.firstName);
      setLastNameError(errors.fieldErrors.lastName)
    } else {
      setEmailError("");
      setPasswordError("");
      setFirstNameError("");
      setLastNameError("");
      handleSubmit(formData);
    }
  };

  const handleSubmit = (formData: { email: string, password: string }) => {
    console.log("Form gönderildi!");
    console.log("Email: ", formData.email);
    console.log("Password: ", formData.password);
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

                <Box display="flex" gap={2}>
                  <TextField
                    margin="normal"
                    required
                    type="text"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="firstName"
                    autoFocus
                    value={firstName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                    error={!!firstNameError}
                    helperText={firstNameError}
                  />



                  <TextField
                    margin="normal"
                    required
                    type="text"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                    autoFocus
                    value={lastName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                    error={!!lastNameError}
                    helperText={lastNameError}
                  />
                </Box>




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
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>

                <Grid container>
               
                  <Grid item>
                    <Link className="hover:underline italic text-blue-500" to="/auth/login">Log in your account</Link>
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

export default Register;
