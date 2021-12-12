import React from 'react'
import {Link} from 'react-router-dom'

export default function FriendCard({name, lastName, _id}) {
    return (
        <div>
            <Link to={`/friends/${_id}`}>
                <h3>{name} {lastName}</h3>
            </Link>
            
        </div>
    )
}