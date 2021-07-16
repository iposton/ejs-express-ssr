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