import {useEffect, useState} from 'react';
import SignUp from "./Components/signUp";
import Login from "./Components/login";
import Journal from './Components/journal';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { logout } from './WebAPIClients/userService';


function App() {
  const [loggedUser, setLoggedUser] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log("user: ", user);
    if(user){
      setShowLogin(false);
      setShowSignup(false);
      setLoggedUser(JSON.parse(user));
    }
  },[])

  function handleSignUp(user){
    setShowLogin(true);
    setShowSignup(false);
  }

  function handleShowLogin(value){
    setShowLogin(value);
    setShowSignup(false);
  }
  function handleLogin(user){
    setShowLogin(false);
    setShowSignup(false);
    setLoggedUser(user);
    localStorage.setItem('user',JSON.stringify(user));
  }

  function handleLogout(e){
    e.preventDefault();
    setShowLogin(false);
    setShowSignup(true);
    setLoggedUser('');
    localStorage.clear();
    logout()
      .then(res => console.log("user logged out"))
      .catch(err => console.log(err));
  }

  return (
    <div >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            My Journal
          </Typography>
          {loggedUser && <Button variant="text" color="inherit" onClick={handleLogout}>Logout</Button> } 
        </Toolbar>
      </AppBar>
      {showSignup && <SignUp onSignUp={handleSignUp} onShowLogin={handleShowLogin}/>}
      {showLogin && <Login onLogin={handleLogin}/>}
      {loggedUser && <Journal user={loggedUser}/>}
      {/* {loggedUser && <Button variant="text" onClick={handleLogout}>Logout</Button> }  */}
    </div>
  );
}

export default App;
