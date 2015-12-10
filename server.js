var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({extended: true})); 

var mysql = require("mysql");
var http = require("http");
var path = require("path");

/*
  * Configure MySQL parameters.
*/
var connection      =         mysql.createConnection({
        host        :         "localhost",
        user        :         "root",
        password    :         "",
        database     :         "two_way_demo"
});

connection.connect(function(error){
  if(error)
    {
      console.log("Problem with MySQL"+error);
    }
  else
    {
      console.log("Connected with Database");
    }
});

/*
  * Configure Express Server.
*/
app.use(express.static(__dirname + ""));
/*
  * Define routing of the application.
*/
app.get('/load',function(req,res){
  connection.query("SELECT * from user_info",function(err,rows){
    if(err)
      {
        console.log("Problem with MySQL"+err);
      }
      else
        {
          res.end(JSON.stringify(rows));
        }
  });
});
app.get("/",function(req,res){
    console.log(req.body);    
    res.sendfile("index.html");
});
app.post("/addd",function(req,res){
    console.log(req.body);
    /* TODO: Now just check that your drive function is correct, SQL is correct and whether what arguements passed to SQL callback is correct */
    connection.query('Insert into user_info (profile_picture,news) VALUES ("'+req.body.pics+'","'+req.body.feed+'")',function(err, results, fields) {
        //if (err) throw err;
        if (err) {console.log("DB Error"+err); res.send("add failed"+err);}
        else res.send("add success");
    });
    //res.send("success");
});
/*
  * Start the Express Web Server.
*/
app.listen(3000,function(){
    console.log("It's Started on PORT 3000");
});