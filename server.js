var express = require('express');
var app = express();

// process.env.PORT lets the port get set by heroku
var port = process.env.PORT || 3000

//
//   __dirname & __filename are a node.js global variables and  
//   are the full filepaths of where the currently executing script 
//   directory & current file  resides  (local to each module)

app.use(express.static( __dirname + '/dist') )

app.get('/*', function(req, res){
  res.sendFile( __dirname+'/dist/index.html' )
});


app.listen(port, function(){
  console.log('app is running here: http://localhost:' + port)
})