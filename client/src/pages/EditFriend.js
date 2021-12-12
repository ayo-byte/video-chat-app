import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function EditFriend() {

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')

    const { id } = useParams()
    console.log(id)

    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/friends/${id}`)
        .then(response => {
            const {name, lastName} = response.data
            setName(name)
            setLastName(lastName)
        })
        .catch(err => console.log(err))
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = {name, lastName}
        axios.put(`/api/friends/${id}`, requestBody)
        .then(response => {
            // this is a redirect using react router
            navigate(`/friends/${id}`)
            console.log('updated')
        })
    }

    const deleteFriend = () => {
        axios.delete(`/api/friends/${id}`)
        .then(() => {
            // redirect to friend list
            navigate('/friends')
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
        <h1>Edit Friend</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input id="name" type="text" value={name} onChange={e => setName(e.target.value)}/>
            <label htmlFor="lastName">Lastname: </label>
            <input id="lastName" type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
            <button type="submit">Update this Friend</button>
        </form>
        <button onClick={deleteFriend}>Delete Friend</button>
     </div>
    )
}