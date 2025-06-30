const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/connectDatabase');
const http = require('http');
const socketIo = require('socket.io');
const validateAccess = require("./router/validateAccess")

// Initialize the Express app
const app = express();

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

// Connect to the database
connectDatabase();

// Middleware for JSON body parsing and CORS handling
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  // Allow only the specific origin without trailing slash
    credentials: true,  // Ensure credentials (cookies, etc.) are allowed
}));

// Import the validateUserAccess function (for Socket.IO)
const { getServerOrderProcessing } = require("./controllers/OPServerOrderProcessingControllers");
const { getServerOrderPlacing } = require("./controllers/OPServerOrderPlacingControllers");
const { getServerOrderCompleted } = require("./controllers/OPServerOrderCompletedControllers");
const { getChefOrderTaking } = require("./controllers/OPChefOrderTakingControllers");
const { getChefOrderCompleted } = require("./controllers/OPChefOrderCompletedController");
const { getCasherBilling } = require("./controllers/OPCasherBillingControllers");

// Create an HTTP server and bind Socket.IO to it
const server = http.createServer(app);

//usefetch methods to router folder
app.use('/api/v1/', validateAccess);

// Configure Socket.IO with CORS
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',  // Allow the exact origin without trailing slash
        methods: ['GET', 'POST'],
        credentials: true,  // Enable credentials (cookies, etc.)
    },
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log(`New client connected ${socket.id}`);

    // Use the validateUserAccess function for each socket connection
    getServerOrderPlacing(socket, io);
    getServerOrderProcessing(socket, io);
    getServerOrderCompleted(socket, io);
    getChefOrderTaking(socket, io);
    getChefOrderCompleted(socket, io);
    getCasherBilling(socket, io);

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});
