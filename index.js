const path = require('path')
const express = require('express')
const app = express()
const proxy = require('express-http-proxy')

app.use(express.static('final-board'))
app.use('/api', proxy('http://8.129.238.142/'))

app.listen('8080')