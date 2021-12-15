import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import { useContext } from 'react'


export default function AddFriend(props){
    const { user } = useContext(AuthContext);
    
    const storedToken = localStorage.getItem('authToken');

    const [username, setUsername] = useState('')

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
        
          })
          .catch((err) => console.log(err));
      };
    return (
        <div>
           <h1>Add a Friend</h1>
            <form onSubmit={handleSubmit}>
               <label htmlFor="username">Username: </label>
               <input id="name" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
             
               <button type="submit">Add this Friend</button>
           </form> 
        </div>
    )
}





//<!-- instead of adding friends manually, SEARCH db for id/friend should be implemented-->


{/* <form action="/search" method="POST">
      <input class="search-form" type="text" placeholder="Search for City" name="search">
      <button class="submit-btn" type="submit">Search</button>
    </form> */}