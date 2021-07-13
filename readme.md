# EJS server side rendered with Express
This is a simple way to server side render a home page without using a js framework. I wanted to build an app that meets the latest trend with minimal use of 3rd party modules. Embedded Javascript [(EJS)](https://ejs.co/#docs) was the simplest way I could solve my problem.

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
<!-- homr.ejs
  -->
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

//TODO Host this app on Netlify
