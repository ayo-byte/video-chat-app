import React from 'react'
import {Link} from 'react-router-dom'

export default function UserCard({name, lastName, _id}) {
    return (
        <div>
            <Link to={`/userprofile/${_id}`}>
                <h3>{name} {lastName}</h3>
            </Link>
            
        </div>
    )
}