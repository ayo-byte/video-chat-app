import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { SocketContext } from '../context/socket';
import { AuthContext } from '../context/auth'

// export default function Sidebar() {
//   const { user } = useContext(AuthContext);
//   const storedToken = localStorage.getItem('authToken');
//   const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
//   // const [idToCall, setIdToCall] = useState('');
//   // const classes = useStyles();
//   const [username, setUsername] = useState('')
//   const [friends, setFriends] = useState('')
//   const [socketId, setSocketId] = useState('')
//   const [idToCall, setIdToCall] = useState('');

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
    //[theme.breakpoints.down('xs')]: {
      //flexDirection: 'column',
      //width: '80%',
  //  },
  },
  // container: {
  //   width: '600px',
  //   margin: '35px 0',
  //   padding: 0,
  //   [theme.breakpoints.down('xs')]: {
  //     width: '80%',
  //   },
  // },
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
}));

// const getCallerId = (e) => {
//   e.preventDefault();
//   // send a post request with the data from the state to the server
//   //to create new friend
//   const requestBody = { username: username };
//   console.log('the body', requestBody);
//     axios.get(`/api/userprofile/${username}`
//     , {
//       headers: { Authorization: `Bearer ${storedToken}` },
//     }
//     )
//   .then(response => {
//       console.log('response is the following',response.data)
//       const {socketId} = response.data
//       // setUsername(username)
//       // setFriends(friends)
//       setSocketId(socketId)
//       console.log('calling socker ID number', socketId)
//       //callUser(socketId)
//   })
//   .catch(err => console.log(err))
// };

// function callUsername (userToCall){
  //get user

//     const [socketId, setSocketId] = useState('')
//     const storedToken = localStorage.getItem('authToken');

//     axios.get(`/api/userprofile/${userToCall}`, {
//       headers: { Authorization: `Bearer ${storedToken}` },
//     })
//   .then(response => {
//       console.log('response is the following',response.data)
//       const {socketId} = response.data
//       // setUsername(username)
//       // setFriends(friends)
//       setSocketId(socketId)
//       console.log('blablablablablbalba', socketId)
//       callUser(socketId)

//   })
//   .catch(err => console.log(err))
// }

const Sidebar = ({ children }) => {
const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
 const [idToCall, setIdToCall] = useState('');
 const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
      {/* <h1>Get Caller ID</h1> */}
            {/* <form onSubmit={getCallerId}>
                <label className="spacing" htmlFor="username">Username: </label>
               <input className="spacing input-border" id="name" type="text" placeholder="Type friend's username..." value={username} onChange={e => setUsername(e.target.value)}/>
                <br></br>
               <button type="submit">Get Caller ID</button>
           </form>
           ID to call is: {socketId} (Copy to call) */}
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>

            
              <Typography gutterBottom variant="h6">Make a call</Typography>
              
              <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {callAccepted && !callEnded ? (
                <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
                  Hang Up
                </Button>
              ) : (
                <Button variant="contained" color="" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
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