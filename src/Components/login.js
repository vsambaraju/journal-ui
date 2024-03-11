import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { login } from '../WebAPIClients/userService';



function Login({onLogin}){

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function handleUserName(e){
        setUserName(e.target.value);
    }

    const handlePassword = e => {
        setPassword(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const validationErrors = {};
        if(!username.trim()){
            validationErrors.username = "Username is required.";
        }else if(!/\S+@\S+\.\S+/.test(username)){
            validationErrors.username = "Username must be a valid email address.";
        }
        if(!password.trim()){
            validationErrors.password = "Password is required.";
        }else if(!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(password)){
            validationErrors.password = "Password must contain at least 1 uppercase letter, 1 number, 1 special character, and have a minimum length of 6 characters.";
        } 
        if(Object.keys(validationErrors).length === 0){
            const userObj ={
                username,
                password
            };
            setLoading(true);
            login(userObj)
            .then(res => {
                setLoading(false);
                if(res.error || res instanceof Error){
                    const message = res.error ? res.error : res.message;
                    setErrorMessage(message);
                }else{
                    onLogin(res);
                }
                
            })
            .catch(err => console.log(err));
            
            setUserName('');
            setPassword('');

        }else{
            setValidationErrors(validationErrors);
        }
    }

    return (
    <Box sx={{ flexGrow: 1, '& button': {m: 2}, '& .MuiTextField-root': { m: 2, width: '25ch' }, margin: 5}}>
            <Grid container spacing={2} sx={{display: 'flex', 'justify-content': 'center','align-items': 'center', 'flex-direction': 'column'}}>    
            {loading && <CircularProgress />}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <Typography variant="h4">Login to your account</Typography>
                <Grid item>
                    <form onSubmit={handleSubmit}>
                        <Stack>
                            <TextField label="Email" onChange={handleUserName} value={username} error={Boolean(validationErrors.username)} helperText={validationErrors.username} ></TextField>
                            <TextField label="Password" value={password} onChange={handlePassword} type="password" error={Boolean(validationErrors.password)} helperText={validationErrors.password}></TextField>
                            <Button variant="contained" type="submit">Login</Button>
                        </Stack>
                    </form>
                </Grid>
            </Grid>
    </Box>
    );
}

export default Login;