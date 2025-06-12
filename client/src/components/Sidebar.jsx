import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { SocketContext } from '../context/socket';
import { AuthContext } from '../context/auth'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    justifyContent: 'center',
    padding:'15px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '1px solid gray',
    margin: '0 auto'
  },
  error: {
    color: 'red',
    marginTop: 10
  }
}));

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem('authToken');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const classes = useStyles();

  const handleCall = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    try {
      const response = await axios.get(`/api/userprofile/${username}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      const { socketId } = response.data;
      
      if (!socketId) {
        setError('User is not online');
        return;
      }

      callUser(socketId);
    } catch (err) {
      console.error('Error calling user:', err);
      setError('User not found or error occurred');
    }
  };

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleCall}>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">Make a call</Typography>
              <TextField 
                label="Username to call" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                fullWidth 
                error={!!error}
                helperText={error}
              />
              {callAccepted && !callEnded ? (
                <Button 
                  variant="contained" 
                  color="secondary" 
                  startIcon={<PhoneDisabled fontSize="large" />} 
                  fullWidth 
                  onClick={leaveCall} 
                  className={classes.margin}
                >
                  Hang Up
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<Phone fontSize="large" />} 
                  fullWidth 
                  type="submit"
                  className={classes.margin}
                >
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Sidebar;