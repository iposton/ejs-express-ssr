'use strict';
import express from 'express'
import ejs from 'ejs'
let data = ['data 1', 'data 2', 'data 3']

const app = express()

app.get('/', function (req, res) {
  ejs.renderFile('views/home.ejs', {data}, {}, (err, template) => {
      if (err) throw err
      res.end(template)
  })
})

export default app