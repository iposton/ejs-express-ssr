# EJS server side rendered with Express
This is a simple way to server side render a home page without using a js framework. I wanted to build an app that meets the latest trend with minimal use of 3rd party modules. This was the simplest way I could solve my problem.

Steps to build this simple ssr app
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

6. serve app <code>node server.js</code>
