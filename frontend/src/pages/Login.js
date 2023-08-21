import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../css/register.css";

const defaultTheme = createTheme();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error,setError]=useState();

  const handleChange = () => {
  	setError()
  };

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  // const handleChange = (event) => {
  //   event.preventDefault();
  //   console.log(email);
  //   console.log(password);
  // };

  async function loginUser(event) {
    event.preventDefault();
    if (email === "" || password === "") {
      setIsEmpty(true);
    } else {
      
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.user) {
        localStorage.setItem("token", data.user);
        setIsLogin(true)

        // alert("Login Successful");
        await delay(2000);

        window.location.href = "/";
      } else {
        // alert("error");
        setError('Login Failed')
      }
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onChange={handleChange} onSubmit={loginUser} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <div className="message">
              {isLogin ? (
                <div className="success" id="success">
                  Login Successfull
                </div>
              ) : (
                ""
              )}
              
              {error?<div className="danger">{error}</div>:null}  

              {isEmpty && (email === "" || password === "") ? (
                <div className="danger" id="danger">
                  Fileds cannot be empty
                </div>
              ) : (
                ""
              )}
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

    // <div>
    //   <h1>Login</h1>
    //   <form onSubmit={loginUser}>
    //   <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} /><br/>
    //   <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} /><br/>
    //   <button type="button" onClick={handleChange}>Click Me!</button>
    //   <input type='submit' name='submit'value='Register'/>
    //   </form>
    // </div>
  );
}

export default Login;
