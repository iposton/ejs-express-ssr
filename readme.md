# EJS server side rendered with Express Deployed to Heroku
This is a simple way to server side render a home page without using a js framework. I wanted to build an app that meets the latest trend with minimal use of 3rd party modules. Embedded Javascript [(EJS)](https://ejs.co/#docs) was the simplest way I could solve my problem.

Demo - [https://ejs-ssr.herokuapp.com/](https://ejs-ssr.herokuapp.com/)

<i>* [Node.js](https://nodejs.org/en/) installed globally is required. I made this on a macbook pro.</i>

#### Steps to build this simple ssr app
1. <code>cd desktop</code>
2. <code>mkdir simple-project</code>
3. <code>cd simple-project</code>
4. <code>touch server.ts package.json</code>

```json
//package.json

{
  "name": "simple-project",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    
  }
}

```

5. <code>npm install ejs express --save</code>


```js
//server.js

const express = require('express')
const ejs = require('ejs')
const port = 3000
let data = ['data 1', 'data 2', 'data 3']

app = express()

app.get('/', function (req, res) {
  ejs.renderFile('views/home.ejs', {data}, {}, (err, template) => {
      if (err) throw err
      res.end(template)
  })
})

app.listen(port, function(err) {
	if(err) throw err
	console.log('Server running on port '+port)
})

```

6. <code>mkdir views</code>
7. <code>cd views</code>
8. <code>touch home.ejs</code>

```html
<!-- homr.ejs -->
<!DOCTYPE html>
<html lang="en">
  
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content=
        "width=device-width, initial-scale=1.0">
</head>
  
<body>
    <ul>
      <% data.forEach((item) => { %>
        <li><%= item %></li>
      <% }); %>
    </ul>
</body>
  
</html>

```

9. <code>cd ..</code>
10. serve app <code>node server.js</code> http://localhost:3000/

#### Deploy to Heroku
<i>* [Heroku toolbet](https://blog.heroku.com/the_heroku_toolbelt) required. After I pushed to a new github repo I deployed to heroku with these steps.</i>
1. <code>touch Procfile</code>
2. specify server in Procfile <code>web: node server.js</code>
3. server.js edit line 3 <code>const port = process.env.PORT || 3000;</code>
4. <code>git heroku login</code>
5. <code>git heroku create my-ssr</code>
6. <code>git push heroku main</code>
7. <code>git heroku open</code>

#### Create API and fetch data for ui
I can make my own data to for loop in the ui by using a json file. I am using NHL goalie data that I started in a previous project, but you can use any data that you want to, I am just showing you how to import the json to the server from a separate file.

1. <code>touch nhlGoalies.json</code>

```json

{
      "Samsonov":{
        "id": 5617,
        "firstName": "Ilya",
        "lastName": "Samsonov",
        "teamId": 5,
        "teamAbbreviation": "WSH",
        "active": true,
        "numberOne": true,
        "nhlId": 0,
        "nhlTeamId": 15,
        "teamCity": "Washington",
        "teamName": "Capitals",
        "teamTwitter": "#ALLCAPS"
      },
      "Vanecek":{
        "id": 14365,
        "firstName": "Vitek",
        "lastName": "Vanecek",
        "teamId": 5,
        "teamAbbreviation": "WSH",
        "active": true,
        "numberOne": false,
        "nhlId": 0,
        "nhlTeamId": 15,
        "teamCity": "Washington",
        "teamName": "Capitals",
        "teamTwitter": "#ALLCAPS"
      }, 
      "Anderson": {
        "id": 757,
        "firstName": "Craig",
        "lastName": "Anderson",
        "teamId": 5,
        "teamAbbreviation": "WSH",
        "active": false,
        "numberOne": false,
        "nhlId": 8467950,
        "nhlTeamId": 15,
        "teamCity": "Washington",
        "teamName": "Capitals",
        "teamTwitter": "#ALLCAPS"
      },
      "Holtby":{
        "id": 4863,
        "firstName": "Braden",
        "lastName": "Holtby",
        "teamId": 21,
        "teamAbbreviation": "VAN",
        "active": true,
        "numberOne": false,
        "nhlId": 0,
        "nhlTeamId": 23,
        "teamCity": "Vancouver",
        "teamName": "Canucks",
        "teamTwitter": "#Canucks"
      },
      "Demko": {
        "id": 13876,
        "firstName": "Thatcher",
        "lastName": "Demko",
        "teamId": 21,
        "teamAbbreviation": "VAN",
        "active": true,
        "numberOne": true,
        "nhlId": 0,
        "nhlTeamId": 23,
        "teamCity": "Vancouver",
        "teamName": "Canucks",
        "teamTwitter": "#Canucks"
      },
      "Binnington": {
        "id": 5908,
        "firstName": "Jordan",
        "lastName": "Binnington",
        "teamId": 17,
        "teamAbbreviation": "STL",
        "active": true,
        "numberOne": true,
        "nhlId": 0,
        "nhlTeamId": 23,
        "teamCity": "St. Louis",
        "teamName": "Blues",
        "teamTwitter": "#STLBlues"
      },
      "Husso": {
        "id": 13661,
        "firstName": "Ville",
        "lastName": "Husso",
        "teamId": 17,
        "teamAbbreviation": "STL",
        "active": true,
        "numberOne": false,
        "nhlId": 8478024,
        "nhlTeamId": 23,
        "teamCity": "St. Louis",
        "teamName": "Blues",
        "teamTwitter": "#STLBlues"
      }
}

```

2. In <code>server.js</code> on line 4 <code>const fs = require('fs')</code>
3. Import <code>json file</code> in <code>server.js</code> <code>let data = fs.readFileSync('nhlGoalies.json'), items = JSON.parse(data)</code>

Now I can pass <code>items</code> into the ui with the <code>EJS module</code>.

4. update <code>home.ejs</code>

```html

<h3>NHL Goalies</h3>
    <ul>
      <% for (let item in items) { %>
        <li><%= items[item].firstName %> <%= items[item].lastName %> - G (<%= items[item].teamAbbreviation %>)</li>
      <% } %>
    </ul>

```

I can share this json data to the public by adding a few more lines of code and generate public API that could be fetched by another app. Sounds fun!

5. <code>npm install cors</code>
6. In <code>server.js</code> on line 7 <code>const cors = require('cors')</code>

```js
//server.js

const express = require('express')
const ejs = require('ejs')
const port = process.env.PORT || 3000
const fs = require('fs')
let data = fs.readFileSync('nhlGoalies.json'),
items = JSON.parse(data)
const cors = require('cors')

app = express()
app.use(express.static('public'))
app.use(cors())

app.get('/nhlgoalies', allItems)
   
function allItems(request, response) {
    response.send(items)
}

app.get('/nhlgoalies/:nhlgoalie/', search);
  
function search(request, response) {
    let term = request.params.nhlgoalie;
    let reply = null;
    term = term.charAt(0).toUpperCase()+ term.slice(1).toLowerCase();
       
    if(items[term])
      reply = items[term]       
    else
      reply = {status:"Not Found"}
       
    response.send(reply);
}

app.get('/', (req, res) => {
  ejs.renderFile('views/home.ejs', {items}, {}, (err, template) => {
      if (err) throw err
      res.end(template)
  })
})

app.listen(port, (err) => {
	if(err) throw err
	console.log('Server running on port '+port)
})

```

7. Go to http://localhost:3000/nhlgoalies to see the API data.
8. To search one item http://localhost:3000/nhlgoalies/samsonov

Live API examples: https://ejs-ssr.herokuapp.com/nhlgoalies https://ejs-ssr.herokuapp.com/nhlgoalies/samsonov

#### Get request examples
This api can be fetched by using a http Get request. Here is an example of how to get the data from this api using angular and the <code>HttpClient Module</code>.

```ts

 this.http.get('https://ejs-ssr.herokuapp.com/nhlgoalies')
   .subscribe(data => {
        console.log(data)
    }) 

```
