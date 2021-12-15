import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import { useContext } from 'react'

export default function FriendDetails() {
    const storedToken = localStorage.getItem('authToken');
    const [friend, setFriend] = useState(null)

    const {id} = useParams()

    useEffect(() => {
       
        axios.get(`/api/friends/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then(response => {
            setFriend(response.data)
        })
        .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
		e.preventDefault();
        axios.put(`/api/addFriend/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then(response => {
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
    }

    return (
        <div>
        {friend && (
            <>

                <h2>Add as friend</h2>
                    <form  onSubmit={handleSubmit}>
                        <button type="submit">Add</button>
                </form>
            </>
        )}
        
        </div>
    )
}

//EDIT friends not relevant but should be used for own profile