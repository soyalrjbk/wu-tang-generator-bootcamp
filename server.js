const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

// The Home Page
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
// The Logic (Making the Wu-Tang Game)
  else if (page == '/api'){
    if('anime' in params){
      res.writeHead(200, {'Content-Type': 'application/json'});

      const names = {
        naruto:"Ninja", 
        gintama:"Samurai", 
        dbz:"Saiyan", 
        re:"Zombie", 
        gow:"Spartan", 
        er:"Warrior",
        red:"Crimson",
        green:"Lantern",
        blue:"Freeze",
        football:"Attack",
        golf:"Lazy",
        mma:"Relentless",
        dumpling:"Cutie",
        noodle:"Long",
        pizza:"Slam"
      }

      const combineFive = [
        names[params['anime']],
        names[params['game']],
        names[params['color']],
        names[params['sport']],
        names[params['food']]
      ]
  
      const firstLetter = combineFive[Math.floor(Math.random()*combineFive.length)]
      const secondLetter = combineFive[Math.floor(Math.random()*combineFive.length)]
      
      const objToJson = {
        name: `${firstLetter} ${secondLetter}`
      }
      res.end(JSON.stringify(objToJson));
    }
  }
// CSS File
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
// Main File
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
// Images File
    }else if (page == '/images/background.jpg'){
    fs.readFile('images/background.jpg', function(err, data) {
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
      res.write(data);
      res.end();
    });
// Anything else: 404!! (Page Not Found)
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
