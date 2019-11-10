var express = require('express');

var app = express();

app.get('/',function(req,res){
  res.send('hello hi world');
});

app.listen(3000,function(){
  console.log('서버서버');
})