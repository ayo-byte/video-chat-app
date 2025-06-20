import React, { useContext, useEffect } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import { AuthContext } from '../context/auth'
import { SocketContext } from '../context/socket';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '1px solid gray',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, isStreamReady } = useContext(SocketContext);
  const { displayName } = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    if (stream && myVideo.current && !myVideo.current.srcObject) {
      myVideo.current.srcObject = stream;
    }
  }, [stream, myVideo.current]);

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{displayName}</Typography>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name}</Typography>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;