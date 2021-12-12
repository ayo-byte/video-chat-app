import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function AddFriend(props){

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        // send a post request with the data from the state to the server
        //to create new friend
        const requestBody = {name: name, lastName: lastName}
        axios.post('/api/friends', requestBody)
        .then(response => {
            console.log(response)
            //reset state
            setName('')
            setLastName('')
            //automatic reload friends after adding
            props.refreshFriends()
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
           <h1>Add a Friend</h1>
           <form onSubmit={handleSubmit}>
               <label htmlFor="name">Name: </label>
               <input id="name" type="text" value={name} onChange={e => setName(e.target.value)}/>
               <label htmlFor="lastName">Lastname: </label>
               <input id="lastName" type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
               <button type="submit">Add this Friend</button>
           </form>
        </div>
    )
}

//<!-- instead of adding friends manually, SEARCH db for id/friend should be implemented-->
