//test request

const express = require('express');
const hbs = require('hbs');
// const ejs = require('')
const port = process.env.PORT || 3000;

var app = express();

var Client = require('node-rest-client').Client;
 
var client = new Client();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const request = require('request');

app.get('/', function(req, res) {
  res.render('pages/main-s.hbs');
  });
  
app.get('/users', function(req, res) {
request({
    url: 'http://locahost:8002/api/users',
    json: true
}, (error, response, body) => {
//console.log(data);
//const users = JSON.parse(body);
const users = response;
res.render('pages/main.hbs', {
        user: users
    });

  });
});
app.post('/users', (req, res) => {
    var text = req.body.tasktext;
    var assignedTo = req.body.assignedTo;
    console.log(text);
    // set content-type header and data as json in args parameter 
    var args = {
    data: { text: text,
          assignedTo: assignedTo},
    headers: { "Content-Type": "application/json" }
    };
    
    //async await begins
    client.post('http://52.61.217.55:8001/api', args, function (data, response) {
    // parsed response body as js object 
         users = data.users;
  
    return users
    });
    // redirect client to individual just added chore page
    res.redirect(307,'/chore-added');
   
   
   });
app.post('/chore-added', (req, res) => {
    
  res.render('pages/chore-success.hbs', {
    pageTitle: 'Added Chore Page',
      
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
