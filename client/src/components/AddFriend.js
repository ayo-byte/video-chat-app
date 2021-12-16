import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import { useContext } from 'react'


export default function AddFriend(props){
    const { user } = useContext(AuthContext);
    
    const storedToken = localStorage.getItem('authToken');

    const [username, setUsername] = useState('')
    const [friends, setFriends] = useState('')

    // useEffect(() => {
    //     axios.get(`/api/userprofile/${id}`, {
    //         headers: { Authorization: `Bearer ${storedToken}` },
    //       })
    //     .then(response => {
    //         console.log('nblablablablabla')
    //         console.log('response is the following',response.data)
    //         const {username,friends} = response.data
    //         setUsername(username)
    //         setFriends(friends)
           

    //     })
    //     .catch(err => console.log(err))
    // }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // send a post request with the data from the state to the server
        //to create new friend
        const requestBody = { username: username, user: user };
        //console.log('the body', requestBody);
        axios
          .put('/api/userprofile/add', requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            console.log(response);
    
            setUsername('');
        
          })
          .catch((err) => console.log(err));
      };
      if (friends === ''){
        return <></>
    }
    return (
        <div>
           <h1>Add a Friend</h1>
            <form onSubmit={handleSubmit}>
               {/* <label className="spacing" htmlFor="username">Username: </label> */}
               <input className="spacing input-border" id="name" type="text" placeholder="Type friend's username..." value={username} onChange={e => setUsername(e.target.value)}/>
                <br></br>
               <button type="submit">Add this Friend</button>
           </form> 
           <div>
               {friends.map(friend => 
                    <p>
                        <a href={`/userprofile/${friend}`}>{friend}</a>
                        
                        
                    </p>)}
                </div>
        </div>
    )
}





//<!-- instead of adding friends manually, SEARCH db for id/friend should be implemented-->


{/* <form action="/search" method="POST">
      <input class="search-form" type="text" placeholder="Search for City" name="search">
      <button class="submit-btn" type="submit">Search</button>
    </form> */}