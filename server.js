const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'tmp/uploads/' })
const util = require('util')

mkdirp('files', (err) => {
  if (err) throw err
})

const app = express()
app.use('/', express.static('dist'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

app.post('/', upload.array('files'), (req, res, next) => {
  // req.files is array of files
  // req.body will contain the text fields, if there were any
  let files = req.files || []
  
  req.files.forEach((file, index) => {
    fs.rename(file.path, path.join('files',  file.originalname), (err) => {
      if (err) throw err
    })
  })
  res.send(util.inspect(req.files))
})


app.listen(8080, () => console.log('Example app listening on port 8080!'))
