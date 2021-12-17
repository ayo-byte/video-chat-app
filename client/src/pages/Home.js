import React from 'react'
//for vid chat:

import VideoPlayer from '../components/VideoPlayer';
import Sidebar from '../components/Sidebar';
import Notifications from '../components/Notifications';
import GetCallerId from '../components/GetCallerId';

export default function Home() {
    return (
        <div>
            <div>
            
             <VideoPlayer />
            <GetCallerId />
               <Sidebar>
                 <Notifications />
            </Sidebar>
             </div>
        </div>
    )
}