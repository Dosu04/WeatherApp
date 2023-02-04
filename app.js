const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")

});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apikey = "d1fffeb319c9633a9c8544d4499167f3";
    const unit = "metric";
    const url = (`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apikey}`);
    
    https.get(url, function(apires){
        // console.log(apires.statusCode);
        apires.on("data", function(data){
        const weatherData = JSON.parse(data);
    //         //console.log(weatheryData);
    //     const stringy = JSON.stringify(weatherData);
    //         //console.log(stringy);
        const tem = weatherData.main.temp
    //         //console.log(temp); 
        const desc = weatherData.weather[0].description;
    //         //console.log(desc);
        const icon = weatherData.weather[0].icon;
    //         //console.log(desc);
        const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
    <link rel="icon" href="https://raw.githubusercontent.com/Dosu04/project-images/main/logo.ico">

            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
            <title>Weather App | Dosu</title>
            <style>
                body{
                    padding: 0;
                    margin: 0;
                }
                
                    
                    /* 
                     */
               
                .main{
                    padding: 0;
                    color: rgb(255, 255, 255);
                    height: 100%;
                    background: linear-gradient(rgba(0, 0, 0, 0.363),rgba(0, 0, 0, 0.664)), url('https://github.com/Dosu04/project-images/blob/main/hero2.jpg?raw=true') no-repeat center ;
                    background-size: 100rem;
                }
                .cont{
                    display: grid;
                    place-items: center;
                    height: 100vh;
                    text-align: center;
                    
                }
        
        
        .desc{
            display: inline-block;
            font-size: 1.2rem;
        }
                footer a{
                    text-decoration: none;
                    color: white;
                }
                a:hover.link1{
                    color: aqua;
                    font-size: larger;
                }
            </style>
        </head>
            <body class="">
                    
                <section class="main container-fluid">
                    <div class="cont">
                        <div class="title">
                            <h1>
                                DOSU-Weather
                            </h1>
                            <p>
                               <marquee>Know the weather in any city in the world!</marquee>
                            </p>
                        </div>
                        <div>
                        
                        <h1>The temperature in ${query} is ${tem} degree Celcius</h1>
                        <p class="desc">The weather is currently ${desc}</p><img src=${imgURL}> 
                        </div>
                        
                        <footer>
                            Weather App Developed by <a class="link1" href="">Emmanuel Oladosu</a>     
                        </footer>
                    </div>
                </section>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
          
            </body>
        </html>`);
        res.send();
            
        })
    });
});




app.listen(3000, function(){
    console.log("Server running on port 3000");
});