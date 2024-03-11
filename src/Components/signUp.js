import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'
import { Typography } from '@mui/material';
import { createUser } from '../WebAPIClients/userService';



function SignUp({onSignUp, onShowLogin}){
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [lastname, setLastName] = useState('');
    const [firstname, setFirstName] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    function handleUserName(e){
        setUserName(e.target.value);
    }

    const handlePassword = e => {
        setPassword(e.target.value);
    }
    const handleLastName = e => {
        setLastName(e.target.value);
    }
    const handleFirstName = e => {
        setFirstName(e.target.value);
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
        if(!firstname.trim()){
            validationErrors.firstname = "First name is required.";
        }
        if(!lastname.trim()){
            validationErrors.lastname = "Last name is required.";
        }
        if(Object.keys(validationErrors).length === 0){
            const userObj={
                username: username,
                password: password,
                first_name: firstname,
                last_name: lastname
            };
            setLoading(true);
            createUser(userObj)
            .then(res => {
                setLoading(false);
                if(res.error || res instanceof Error){
                    const message = res.error ? res.error : res.message;
                    setErrorMessage(message);
                }else {
                    onSignUp(username);
                }
            })
            .catch(error => {
                setErrorMessage(error.message);
                setLoading(false);
            });
            setUserName('');
            setPassword('');
        }else{
            setValidationErrors(validationErrors);
        }     
    }

    const handleLogin = e =>{
        onShowLogin(true);
    }


    return(
        <Box sx={{ flexGrow: 1, '& button': {m: 2}, '& .MuiTextField-root': { m: 2, width: '25ch' }, margin: 5}}>
            <Container>
                <Grid container spacing={2} sx={{display: 'flex', 'justify-content': 'center','align-items': 'center', 'flex-direction': 'column'}}>
                    <Grid item>
                        <Typography variant="h4">Create an Account</Typography>
                        {loading && <CircularProgress />}
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                        <form onSubmit={handleSubmit}>
                            <Stack>
                                <TextField label="First Name" onChange={handleFirstName} value={firstname} error={Boolean(validationErrors.firstname)} helperText={validationErrors.firstname}></TextField>
                                <TextField label="Last Name" onChange={handleLastName} value={lastname} error={Boolean(validationErrors.lastname)} helperText={validationErrors.lastname}></TextField>
                                <TextField label="Email" onChange={handleUserName} value={username} error={Boolean(validationErrors.username)} helperText={validationErrors.username}></TextField>
                                <TextField label="Password" value={password} onChange={handlePassword} type="password" error={Boolean(validationErrors.password)} helperText={validationErrors.password}></TextField>
                                <Button variant="contained" size="large" type="submit">Signup</Button>
                            </Stack>
                        </form>
                    </Grid>
                    <Grid item> 
                        <Stack direction="row" spacing={2}>
                            <Typography variant="h6">Already a user?</Typography>
                            <Button variant="text" onClick={handleLogin}>Login</Button>
                        </Stack>

                    </Grid>
                </Grid>
            </Container>
        </Box>

    );
}

export default SignUp;