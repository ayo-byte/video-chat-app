import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import FriendList from './pages/FriendList'
import FriendDetails from './pages/FriendDetails'
import EditFriend from './pages/EditFriend.js'
import UserDetails from './pages/UserDetails.js'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/friends' element={<FriendList />} />
        <Route path='/friends/:id' element={<FriendDetails />} />
        <Route path='/friends/edit/:id' element={<EditFriend />} />
        <Route path='/userProfile' element={<UserDetails />} />

      </Routes>
    </div>
  );
}

export default App;
