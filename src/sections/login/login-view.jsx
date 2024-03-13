import { useState } from 'react';
// import axios from 'axios';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import authService from 'src/services/authService';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

export default function LoginView() {

  const theme = useTheme();

  const router = useRouter();

  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const vertical = 'top';
  const horizontal = 'right';


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.login(username, password);
      // console.log(res);
      setUser(res);
      router.push('/');
    } catch (err) {
      setError(err.message);
      setOpenSnackbar(true);
    }
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const renderForm = (
    <form onSubmit={handleLogin}>
      <Stack spacing={3}>
        <TextField name="username" label="Username" value={username}
          onChange={(e) => setusername(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
      >
        Login
      </LoadingButton>
    </form>
  );
  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ mb: 5 }}>Sign in to Work App</Typography>

          {renderForm}

          <Typography variant="body2" sx={{ mt: 5, mb: 2 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>
        </Card>
      </Stack>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical, horizontal }}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
          {error}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
