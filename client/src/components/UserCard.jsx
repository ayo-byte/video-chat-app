import React from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { useContext } from 'react'

export default function UserCard({name, lastName, _id}) {
    const { loginUser, user } = useContext(AuthContext)
    console.log(user)

    return (
        <div>
            {user &&(
                <>
                 {user.name}
                </>
           )} 
            
            
        </div>
    )
}