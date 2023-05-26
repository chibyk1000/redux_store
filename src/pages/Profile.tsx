import { FormEvent, useEffect, useState } from "react";

import useAppSelector from "../hooks/useAppSelector";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/reducers/userReducer";

const Profile = () => {
  const { user } = useAppSelector((state) => state.userReducers);
  const dispatch  = useDispatch<any>() 
  
  const [data, setData] = useState({ name: "", email: "", role: "", id: 0 });
  
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    dispatch(updateUser(data))
  };
  useEffect(() => {
    if (user) {
      setData({
        name: user.name,
        email: user.email,
        role: user.role,
        id: user.id,
      });
    }
  }, [user]);
  return (
    // <div className="account page">
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ mt: 1, width: { xs: "95%", md: "50%" } }}
    >
      <Grid container spacing={2}>
        <Typography
          component="h1"
          variant="h5"
          sx={{ color: "var(--primary-color)" }}
        >
          Update Profile
        </Typography>
        <Grid item xs={12}>
          <TextField
            autoComplete="given-name"
            name="fullname"
            required
            fullWidth
            id="Full Name"
            value={data.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, name: event.target.value })
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
            placeholder="email"
            name="email"
            value={data.email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, email: event.target.value })
            }
            autoComplete="email"
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
              disabled
              value={data.role}
            >
              <MenuItem value="admin">admin</MenuItem>
              <MenuItem value="customer">customer</MenuItem>
            </Select>
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
        Update profile
      </Button>
    </Box>

    // </div>
  );
};

export default Profile;
