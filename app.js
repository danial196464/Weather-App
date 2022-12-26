const express = require('express');
const app =express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

      res.sendFile(__dirname+"/index.html");
    })


app.post("/",function(req,res){
  var city = req.body.cityname;
  var apiKey = "0ef4f185ccf943c0aaa154034222312";
  const url = "https://api.weatherapi.com/v1/current.json?key="+apiKey+"&q="+ city ;
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data)
      var temp = weatherData.current.temp_c;
      var icon = weatherData.current.condition.icon;
      var iconUrl = "http:"+icon;

      res.write("<h1>"+city+" temperature is " + temp +" centigrade.</h1>");
      res.write("<img src="+iconUrl+"></img>")
      res.send();
    })
  })
})

app.listen(process.env.PORT || 3000,function(){
  console.log("Listening on port 3000");
})
