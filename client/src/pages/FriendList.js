import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import FriendCard from '../components/FriendCard'
import AddFriend from '../components/AddFriend'


export default function FriendList() {
    
    const [friends, setFriends] = useState([])

    // request all friends from the server

    const getAllFriends = () => {
        axios.get('/api/friends')
        .then(response => {
            console.log(response)
            setFriends(response.data)
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {

        getAllFriends()
    }, [])
    
if (friends.length === 0){
    return <h1>No friends</h1>
}

    return (
        <>
            <h1>All friends</h1>
            {friends.map(friend => <FriendCard key={friend._id} {...friend}/>)}
            <AddFriend refreshFriends={getAllFriends}/>

        </>
    )
}