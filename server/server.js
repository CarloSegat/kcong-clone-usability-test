const express = require('express')
const fs = require('fs')
var cors = require('cors')
const app = express()
app.use(cors())

const port = 3001

app.get('/shape/:filename', (req, res) => {
    if(!fs.existsSync(`./shapes/${req.params.filename}.ttl`)){
        res.send(`The shape: ${req.params.filename}.ttl doesnt exisst`)
    } else {
        fs.readFile(`./shapes/${req.params.filename}.ttl`, (err, data) => {
            // console.log("data:", data)
            // console.log("data:", String(data))
            res.setHeader('content-type', 'text/turtle');
            res.send(String(data))
        })
    }
  })

app.get('/rdf/:filename', (req, res) => {
  if(!fs.existsSync(`./rdf/${req.params.filename}.ttl`)){
      res.send('Requested rdf file doesnt exist')
  } else {
      fs.readFile(`./rdf/${req.params.filename}.ttl`, (err, data) => {
          // console.log("data:", data)
          // console.log("data:", String(data))
          res.setHeader('content-type', 'text/turtle');
          res.send(String(data))
      })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})