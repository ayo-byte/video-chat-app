import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export default function FriendDetails() {

    const [friend, setFriend] = useState(null)

    const {id} = useParams()

    useEffect(() => {
       
        axios.get(`/api/friends/${id}`)
        .then(response => {
            setFriend(response.data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
        {friend && (
            <>

                <h3>{friend.name} {friend.lastName}</h3>

                <Link to={`/friends/edit/${friend._id}`}>
                    <button>Edit this friend</button>
                </Link>
            </>
        )}
        
        </div>
    )
}

//EDIT friends not relevant but should be used for own profile