import React from 'react'
//for vid chat:
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideoPlayer from '../components/VideoPlayer';
import Sidebar from '../components/Sidebar';
import Notifications from '../components/Notifications';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <div>
            <AppBar  position="static" color="inherit">
              <Typography variant="h2" align="center">Video Chat</Typography>
            </AppBar>
            <VideoPlayer />
            <Sidebar>
              <Notifications />
            </Sidebar>
          </div>
        </div>
    )
}