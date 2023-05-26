import axios from 'axios';
import { FormEvent,  useState} from 'react'
import {  useNavigate } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';

import { createUser } from '../redux/reducers/userReducer';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Avatar, Box, Button, Select, MenuItem, Container, CssBaseline,InputLabel, FormControl, Grid, TextField, Typography, Link, SelectChangeEvent } from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { MuiFileInput } from "mui-file-input";
import { toast } from 'react-toastify';
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const Signup = () => {


  const [name, setName] =  useState('')
  const [email, setEmail] =  useState('')
  const [password, setPassword] =  useState('')
  const [passwordConfirmation, setPasswordConfirmation] =  useState('')
  const [role, setRole] =  useState('')
  const [file, setFile] = useState<File | null>(null)
  
  const dispatch = useAppDispatch()
 
  const navigate =  useNavigate()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {

      if (!name || !email || !password || !passwordConfirmation || !file) {
        toast.error("missing fields")
        return
      }

        if ( !password !== !passwordConfirmation ) {
          toast.error("password mismatch");
          return;
        }
      if (file) {
        const formdata = new FormData()

        formdata.append('file',file)
        const resp = await axios.post("https://api.escuelajs.co/api/v1/files/upload", formdata);
        console.log(resp.data.location);
        if (resp.status === 201) {
          const data:any = { avatar: resp.data.location, name, email, password, role }
          
          dispatch(createUser(data))

  
          
      setTimeout(() => navigate("/signin"), 4000);
        }
        
      }
    
} catch (error) {
  console.log(error);
  
}  
  
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "var(--primary-color)",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: { xs: "95%", md: "50%" } }}
          >
            <Avatar sx={{  bgcolor: "var(--primary-color)", margin:"auto" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h3"
              sx={{ color: "var(--primary-color)" , marginBottom:8}}
            >
              Sign up 
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullname"
                  required
                  fullWidth
                  id="Full Name"
                  value={name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setName(event.target.value)
                  }
                  label="First Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(event.target.value)
                  }
                  value={email}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                  value={password}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Password Confirmation"
                  type="password"
                  id="password_confirmation"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPasswordConfirmation(event.target.value)
                  }
                  value={passwordConfirmation}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">Role </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    fullWidth
                    label="Role"
                    placeholder="Role"
                    onChange={(event: SelectChangeEvent) =>
                      setRole(event.target.value)
                    }
                    value={role}
                  >
                    <MenuItem value="admin">admin</MenuItem>
                    <MenuItem value="customer">customer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <FormControl sx={{ width: "100%" }}>
                  <Typography component="label">Upload Photo</Typography>
                  <MuiFileInput
                    value={file}
                    onChange={(file) => setFile(file)}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "var(--secondary-color)",
                "&:hover": {
                  backgroundColor: "var(--secondary-color)",
                },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Signup