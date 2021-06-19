const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const expressSanitizer = require('express-sanitizer');
const dotenv = require('dotenv')

//Init app server
const app = express()

//setup http listner
const http = require('http').Server(app);

//init websocket
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

//Test
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('addPoint', (message) =>     {
        console.log(message);
        socket.broadcast.emit('addPoint', message );   
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected');
     });
});

//Set environment variables
dotenv.config()

//Set CORS
app.use(cors())

//Init morgon log
app.use(morgan(process.env.MORGAL_LOG_LEVEL))

//Body parser
app.use(express.json({strict : true }));
app.use(express.urlencoded({ extended: false }));

//Input sanitizer
app.use(expressSanitizer());

//Undefined Routes
app.all('*', (req, res) => {
    res.status(200).send("Hello There!!")
})

//Set app port
const PORT = process.env.PORT || process.env.DEFAULT_PORT

//Start Server
http.listen(PORT, function() {
    console.log(`listening on *:${PORT}`);
 });