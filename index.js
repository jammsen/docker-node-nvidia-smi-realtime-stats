const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const axios = require("axios");
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
  
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

function callAPI() {
    axios.get(`http://10.0.0.10:2091/getcommands`).then((response) => {
        io.emit('nvidia-smi', response.data.nvidia_smi);
        io.emit('htop', response.data.htop);
    }).catch((error) => {
        console.error("Error making API request:", error);
    });
}

setInterval(() => {
    callAPI();
}, 1000);
