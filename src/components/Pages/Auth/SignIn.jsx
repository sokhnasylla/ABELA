import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import background from "../../../assets/background.jpeg";
import { Navigate } from 'react-router-dom';
import { storeTokenInLocalStorage } from './authUtils';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";



function SignInSide() {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isLoggedSuccess, setLoggedSuccess] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://10.137.15.78:8082/abela-usermanagement/api/v1/auth/authenticate", {
        login,
        password
      });

      if (response.data.success) {
        setLoggedSuccess(true);
        storeTokenInLocalStorage(response.data.data.token);
        const decodedToken = jwtDecode(response.data.data.token);
        console.log(decodedToken); // Affiche le contenu du token dans la console
      } else {
        setError(response.data.message); // Mettre le message d'erreur dans la variable error
      }
      
    } catch (error) {
      // setError(`Erreur: ${error.message}`);
      console.error('Erreur lors de la connexion', error);
    } finally {
      setLoading(false);
    }
  };


  if (isLoggedSuccess) {
    return <Navigate to="/home" />;
  }

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',

          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#148CA8' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Connexion
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="login"
                label="Login Windows"
                name="login"
                autoComplete="login"
                autoFocus
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {loading ? (
                <Button
                  fullWidth
                  disabled
                  sx={{ mt: 3, mb: 2 }}
                >
                  Loading...
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#FF6600",
                    "&:hover": {
                      backgroundColor: "#FF6600",
                    },
                  }}
                >
                  Se connecter
                </Button>
              )}
              {error && <Typography color="error">{error}</Typography>}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;