// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;
// Spin up the server
app.listen(port, listening);
// Callback to debug
function listening(){
    console.log('server running');
    console.log(`running on:http://localhost:${port}`);
};

// Callback function to complete GET '/all'
app.get('/all', (req, res)=> {
    res.send(projectData);
});

// Post Route
app.post('/add', (req, res)=> {
    const projectData = {
        date:req.body.date,
        temp:req.body.temp,
        content:req.body.content
    };
    res.send(projectData);
});
