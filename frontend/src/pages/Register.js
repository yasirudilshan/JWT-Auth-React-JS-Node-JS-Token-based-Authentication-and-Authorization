
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HowToReg from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Msg from '../components/Msg';
import "../css/register.css";


const defaultTheme = createTheme();



function Register() {
  const navigate = useNavigate();
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [isRegister, setIsRegister] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);


  // const handleChange = (event) => {
	// 	setName(event.target.value);
  //   console.log(name)
	// };



   const handleChange = () => {
		console.log(name);
    console.log(email);
    console.log(password);
	};

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  async function registerUser(event){
    event.preventDefault()
    if(name === '' || email === '' || password === ''){
      console.log("Empty")
      setIsEmpty(true)
    }
    else{
    const response = await fetch('http://localhost:8000/api/register', {
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },  
    body: JSON.stringify({
        name,
        email,
        password,
      })
    })

    const data=await response.json()
    console.log(data)

    if(data.status==='ok'){
      setIsRegister(true)

      await delay(2000);
      navigate('/login')

    }
    else{
      console.log(data)
    }
  }
  }
  
  useEffect(()=>{
    
  },[isRegister])


  return (

    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={registerUser} noValidate sx={{ mt: 1 }}>
          
        <TextField onChange={(e)=>setName(e.target.value)}
            
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField onChange={(e)=>setEmail(e.target.value)}
            type="email"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            
          />

          
          <TextField onChange={(e)=>setPassword(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          

            {/* <div className='message'>
              <div style={inputStyle}>
                  Data saved Successfully
              </div>
              <div style={inputStyle}>
                  Fileds cannot be empty
              </div>
            </div> */}



          <div className='message'>
            {isRegister?
            <div className='success' id='success'>
              Data saved Successfully
            </div>:""}
            {isEmpty&&(email===''||name===''||password==='')?
            <div className='danger' id='danger'>
              Fileds cannot be empty
            </div>:""}
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
            <Grid>
            </Grid>
            <Grid item>
              <Link href='/login' variant="body2">
                {"Already Registered? Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>

    // <div>
    //   <h1>Register</h1>
    //   <form onSubmit={registerUser}>
    //   <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} /><br/>
    //   <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} /><br/>
    //   <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} /><br/>
    //   <button type="button" onClick={handleChange}>Click Me!</button>
    //   <input type='submit' name='submit'value='Register'/>
    //   </form>
    // </div>
  );
}

export default Register;
