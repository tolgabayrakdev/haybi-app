import { Box, Button, Card, Grid, TextField } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {}

export default function ResetPassword({ }: Props) {
    const [email, setEmail] = useState("");

    const handleFormSubmit = (e: any) => {
      
    }

    return (
        <div>



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
                                    onChange={(e)=>setEmail(e.target.value)}

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
                                        <Link className="hover:underline italic text-blue-500" to="/auth/login">Back</Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </Box>


        </div>
    )
}