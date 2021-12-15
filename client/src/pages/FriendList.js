import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import FriendCard from '../components/FriendCard'
import AddFriend from '../components/AddFriend'
import { AuthContext } from '../context/auth'
import { useContext } from 'react'

export default function FriendList() {
    
    const { user } = useContext(AuthContext);


    const [friends, setFriends] = useState([])

    // request all friends from the server
    const storedToken = localStorage.getItem('authToken');
    const getAllFriends = () => {
        axios
          .get('/api/userprofile', {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            console.log(response);
            setFriends(response.data);
          })
          .catch((err) => console.log(err));
      };
      useEffect(() => {
        getAllFriends();
      }, []); 
    
// if (friends.length === 0){
//     return <h1>No friends</h1>
// }
      console.log(user)
      console.log('friends', user.friends)
    return (
        <>
            <h1>All friends</h1>
            
            {friends.map(friend => <FriendCard key={friends._id} {...friends}/>)}
            <AddFriend refreshFriends={getAllFriends}/>

        </>
    )
}