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
import { login } from '../Dashboard/user.service';
import { CircularProgress } from '@mui/material';

const defaultTheme = createTheme();

class SignInSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      loading: false,
      error: null,
      isLoggedSuccess: false
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, error: null });

    login({login: this.state.login, password: this.state.password}).then( response => {
      if (response) {
        if(response.success) {
          this.setState({ isLoggedSuccess: true });
        } else {
          this.setState({ error: response.message }); 
        }
      }
    }).catch((error) => {
      console.error('Erreur lors de la connexion', error);
    }).finally(() => {
      this.setState({ loading: false });
    })
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (this.state.isLoggedSuccess) {
      return <Navigate to="/" />;
    }

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
              <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="login"
                  label="Login Windows"
                  name="login"
                  autoComplete="login"
                  autoFocus
                  value={this.state.login}
                  onChange={this.handleChange}
                />
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                {this.state.loading ? (
                  <Button
                    fullWidth
                    disabled
                    sx={{ mt: 3, mb: 2 }}
                  >
                    <CircularProgress color="warning" size={20} />
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
                {this.state.error && <Typography color="error">{this.state.error}</Typography>}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}

export default SignInSide;
