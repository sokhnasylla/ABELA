import React, { useState, useEffect } from 'react';
import { redirect,useNavigate } from 'react-router-dom';
  import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
    Paper,
  } from '@mui/material';
  import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
  import post from '../../API/post';
  import { useMutation, QueryClient, QueryClientProvider } from 'react-query';
  import CustomizedSteppers from "./MyStep"
import useAuth from './useAuth';


  const defaultTheme = createTheme();

  const queryClient = new QueryClient();
 

  export default function SignUp({ onFormSubmit, userData }) {
   useAuth()

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(userData?.prenom || '');
    const [lastName, setLastName] = useState(userData?.nom || '');
    const [email, setEmail] = useState(userData?.email || '');
    const [login, setLogin] = useState(userData?.login || '');
    const [structure, setStructure] = useState(userData?.structure || '');
    const [password, setPassword] = useState('');
    const [isSubmmitted, setIsSubmitted]=useState(false);

    const mutation = useMutation((userData) => post(userData, "http://127.0.0.1:8000/api/register"), {
      onSuccess: (data) => {
        console.log('Utilisateur créé avec succès :', data);
        onFormSubmit();
        navigate('/admin/user')
      },
      onError: (error) => {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
      },
      onSettled: () => {
        queryClient.invalidateQueries('users');
      },
    });

    const handleSubmit = (event) => {
      event.preventDefault();
      const userData = {
        prenom: firstName,
        nom: lastName,
        email: email,
        password: password,
        structure: structure,
        login: login,
      };
      mutation.mutate(userData);
    };

    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
         <Paper>
           <CustomizedSteppers/>
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#148C8A' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
               {userData? "Modifier un Utilisateur":" Créer un utilisateur"}
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={1} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="Prénom"
                      autoFocus
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Nom"
                      name="lastName"
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="login"
                      label="Login Windows"
                      name="login"
                      autoComplete="loginWindows"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="structure"
                      label="Structure"
                      name="structure"
                      autoComplete="structure"
                      value={structure}
                      onChange={(e) => setStructure(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Mot de Passe"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2, backgroundColor: "#FF6600" }}
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? 'En cours...' : 'Enregistrer'}
                </Button>
              </Box>
            </Box>
          </Container>
         </Paper>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }
