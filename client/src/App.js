import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import FriendList from './pages/FriendList'
import FriendDetails from './pages/FriendDetails'
import EditFriend from './pages/EditFriend'
import UserDetails from './pages/UserDetails'
import Signup from './pages/Signup'
import Login from './pages/Login'
import JWTest from './JWTest';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute'



function App() {

  return (
    <div className="App">
      <Navbar />
          
          
        <Routes>
        <Route path='/' element={<Home />} />
          {/* <Route path='/projects' element={<ProjectList />} /> */}
          {/* this is a protected route */}
          
          <Route
            path='/friends'
            element={
              <ProtectedRoute redirectTo='/login'>
                <FriendList />
              </ProtectedRoute>
            }
          />
        <Route path='/' element={<Home />} />
        <Route path='/friends' element={<FriendList />} />
        <Route path='/friends/:id' element={<FriendDetails />} />
        <Route path='/friends/edit/:id' element={<EditFriend />} />
        <Route path='/userProfile' element={<UserDetails />} />
        <Route path='/signup' element={<Signup />} />
        {/* <Route path='/userprofile/:id' element={<FindFriend />} /> */}

        <Route path='/login' element={<Login />} />

      </Routes>
    </div>
  );
}

export default App;
