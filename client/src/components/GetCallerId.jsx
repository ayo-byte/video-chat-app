import React, { useState, useContext, useEffect } from 'react';
import { SocketContext } from '../context/socket';
import axios from 'axios'
import { AuthContext } from '../context/auth'

import { useParams, Link } from 'react-router-dom'

export default function GetCallerId({ onSocketIdChange }){
    const { user } = useContext(AuthContext);
    const storedToken = localStorage.getItem('authToken');
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    // const [idToCall, setIdToCall] = useState('');
    // const classes = useStyles();
    const [username, setUsername] = useState('')
    const [socketId, setSocketId] = useState('')

    const { id } = useParams()

    const getId = (e) => {
        e.preventDefault();
        // send a post request with the data from the state to the server
        //to create new friend
        //const requestBody = { username: username, user: user };
        //console.log('the body', requestBody);
           axios.get(`/api/userprofile/${username}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    }
    )
  .then(response => {
      console.log('response is the following',response.data)
      const {socketId} = response.data
      // setUsername(username)
      // setFriends(friends)
      setSocketId(socketId)
      // Pass the socket ID to the parent component
      onSocketIdChange(socketId)
      console.log('calling socket ID number', socketId)
  })
  .catch(err => console.log(err))
      };
      return (
        <div>
            <h1>Get Caller ID</h1>
            <form onSubmit={getId}>
                {/* <label className="spacing" htmlFor="username">Username: </label>  */}
               <input className="spacing input-border bigger" id="name" type="text" placeholder="Type friend's username..." value={username} onChange={e => setUsername(e.target.value)}/>
                <br></br>
               <button type="submit">Get Caller ID</button>
           </form>
           This is the Caller ID: {socketId}

        </div>
      )
};