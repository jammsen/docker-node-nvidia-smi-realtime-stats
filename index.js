const { exec } = require('child_process');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
  
// Start the server and socket.io
server.listen(3000, () => {
console.log(`Server started on port ${port}`);
});
  

setInterval(() => {
    const ns_command = 'nvidia-smi | aha --black --line-fix';
    exec(ns_command, (error, stdout, stderr) => {
        if (error) {
            io.emit('nvidia-smi', error);
        } else {
            io.emit('nvidia-smi', stdout);
        }
    });
    const htop_command= 'echo q | htop | aha --black --line-fix';
    exec(htop_command, (error, stdout, stderr) => {
        if (error) {
            io.emit('htop', error);
        } else {
            io.emit('htop', stdout);
        }
    });
}, 500);
