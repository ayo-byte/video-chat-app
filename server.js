console.log('running server.js')

const app = require("./app");
// const server = require("http").createServer(app);
const cors = require("cors");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;

let server = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});


const io = require('socket.io')(server, {
  cors: {
      origin: '*',
      methods: ['GET', 'POST']
  }
});

app.use(cors());

//export to login/auth so socket gets created only then
io.on("connection", (socket) => {
  let socketId = socket.id;
  console.log('socketid is :', socketId)
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded")
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal)
  });
});

module.exports = io