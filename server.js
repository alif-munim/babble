// SERVER SIDE

const io = require("socket.io")(3000);

const users = {};

io.on("connection", socket => {
    socket.on("send-chat-message", message => {
        socket.broadcast.emit("chat-message", {
            message: message,
            name: users[socket.id]
        });
    });
    
    socket.on("new-user", user => {
         users[socket.id] = user;
         socket.broadcast.emit("user-connected", user);
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("user-disconnected", users[socket.id]);
        delete users[socket.id];
    })
});