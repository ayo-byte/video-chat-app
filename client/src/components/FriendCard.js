import React from 'react'
import {Link} from 'react-router-dom'

export default function FriendCard({name, lastName, _id}) {
    return (
        <div>
            <Link to={`/userprofile/friends/${_id}`}>
                <h3>display friend username</h3>
                <p></p>
            </Link>
            {/* <h2>Add friend</h2>
            <form  onSubmit={handleSubmit}>
                <button type="submit">Add</button>
            </form> */}
        </div>
    )
}