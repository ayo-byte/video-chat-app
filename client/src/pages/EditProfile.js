import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { useContext } from 'react'


export default function EditProfile() {
    const { isLoggedIn, user, logoutUser } = useContext(AuthContext)

    const storedToken = localStorage.getItem('authToken');
    const [username, setUsername] = useState('')
    const [displayName, setDisplayName] = useState('')

    const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    // const { id } = useParams()
    // console.log(id)

    // let navigate = useNavigate();

    // useEffect(() => {
    //     axios.get(`/api/userprofile/${id}`, {
    //         headers: { Authorization: `Bearer ${storedToken}` },
    //       })
    //     .then(response => {
    //         const {username, email} = response.data
    //         setUsername(username)
    //         setEmail(email)
    //         //setPassword(password)

    //     })
    //     .catch(err => console.log(err))
    // }, [])

    const { id } = useParams();
    console.log(id)
    console.log('this is the username', id);

    let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/userprofile/${username}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const { username, email } = response.data;
        setUsername(username);
        setEmail(email);
        //setPassword(password)
      })
      .catch((err) => console.log(err));
  }, []);

    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = {displayName, email}
        axios.put(`/api/userprofile/edit/${id}`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then(response => {
            // this is a redirect using react router
            // return response.data
            navigate(`/userprofile/${id}`)
            console.log('updated')
        })
    }

    const deleteProfile = () => {
        axios.delete(`/api/userprofile/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then(() => {
            // redirect to friend list
            logoutUser()
            
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
            <label className="spacing" htmlFor="displayName">Display Name: </label>
            <input className="spacing input-border" id="displayName" type="text" placeholder="Type new display name..."value={displayName} onChange={e => setDisplayName(e.target.value)}/>
            <br></br>
            <label className="spacing" htmlFor="email"> Email: </label>
            <input className="spacing input-border" id="email" type="text" placeholder="Type new email..." value={email} onChange={e => setEmail(e.target.value)}/>
            <br></br>
             {/* <label htmlFor="password">Password: </label>
            <input id="password" type="text" value={password} onChange={e => setPassword(e.target.value)}/> */} 
            <button type="submit">Update my Profile</button>
        </form>
        <button onClick={deleteProfile}>Delete my Profile</button> 
     </div>
    
    )
}