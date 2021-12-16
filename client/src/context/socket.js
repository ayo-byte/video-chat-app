import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import axios from 'axios'


const SocketContext = createContext();
let socket;

//const socket = io('http://localhost:5005');
// //const socket = io('https://......herokuapp.com');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  
  //this line to select uder id to call?
  const [name, setName] = useState('');

  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [socketId, setSocketId] = useState('');

    const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((currentStream) => {
//         setStream(currentStream);

//         myVideo.current.srcObject = currentStream;
//       });

//      socket.on('me', (id) => setMe(id));

//     socket.on('callUser', ({ from, name: callerName, signal }) => {
//       setCall({ isReceivingCall: true, from, name: callerName, signal });
//     });
//   }, []);

    const setUp = () => {
        socket = io('http://localhost:5005');
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
            setStream(currentStream);

            myVideo.current.srcObject = currentStream;
        });

        socket.on('me', (id) => setMe(id));


        socket.on('callUser', ({ from, name: callerName, signal }) => {
        setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };
//id is passed here to select who the call is going to
  const callUser = (id) => {


    axios.get(`/api/userprofile/${id}`
    // , {
    //   headers: { Authorization: `Bearer ${storedToken}` },
    // }
    )
  .then(response => {
      console.log('response is the following',response.data)
      const {socketId} = response.data
      // setUsername(username)
      // setFriends(friends)
      setSocketId(socketId)
      console.log('calling socker ID number', socketId)
  })
  .catch(err => console.log(err))



    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      console.log('calling', socketId, data, me, name)
      console.log(socketId)
      socket.emit('callUser', { userToCall: socketId, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
    
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      setUp,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
      </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };