import axios from 'axios'
import { AuthContext } from '../context/auth'

import { useParams, Link } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer';

import React, { useState, useContext, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../context/socket';


export default function AddFriend(props){
    const { user } = useContext(AuthContext);
    const storedToken = localStorage.getItem('authToken');
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    // const [idToCall, setIdToCall] = useState('');
    // const classes = useStyles();
    const [username, setUsername] = useState('')
    const [friends, setFriends] = useState('')
    const [socketId, setSocketId] = useState('')

    const { id } = useParams()

    useEffect(() => {
        axios.get(`/api/userprofile/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then(response => {
            console.log('response is the following',response.data)
            const {username,friends, socketId} = response.data
            setUsername(username)
            setFriends(friends)
            setSocketId(socketId)
            console.log('blablablablablbalba', socketId)

        })
        .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // send a post request with the data from the state to the server
        //to create new friend
        const requestBody = { username: username, user: user };
        //console.log('the body', requestBody);
        axios
          .put('/api/userprofile/add', requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            console.log(response);
    
            setUsername('');
            // setFriends('')
          })
          .catch((err) => console.log(err));
      };
      if (friends === ''){
        return <></>
    }
    return (
        <div>
           <h1>Add a Friend</h1>
           {/* <VideoPlayer /> */}
            <form onSubmit={handleSubmit}>
               {/* <label className="spacing" htmlFor="username">Username: </label> */}
               <input className="spacing input-border" id="name" type="text" placeholder="Type friend's username..." value={username} onChange={e => setUsername(e.target.value)}/>
                <br></br>
               <button type="submit">Add this Friend</button>
           </form> 
           <div>
             <h2>All friends</h2>
               {friends.map(friend => 
                    <p>
                        <a href={`/userprofile/${friend}`}>{friend}</a>
                        {/* <Button variant="contained" color="" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(socketId)}>   */}
                        {/* className={classes.margin}> */}
                         {/* Call */}
                       {/* </Button> */}
                        
                        
                    </p>)}
                </div>
        </div>
    )
}





//<!-- instead of adding friends manually, SEARCH db for id/friend should be implemented-->


{/* <form action="/search" method="POST">
      <input class="search-form" type="text" placeholder="Search for City" name="search">
      <button class="submit-btn" type="submit">Search</button>
    </form> */}