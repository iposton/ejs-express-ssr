const express = require('express')
const ejs = require('ejs')
const port = process.env.PORT || 3000;
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