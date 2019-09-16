require('dotenv').config()

const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')

// const cloudinaryConfig = require('./src/configs/cloudinaryConfig').cloudinaryConfig

const PORT = process.env.PORT || 3306
const routes = require('./src/Routes/routes')
app.use(cors())
// app.use(express.static(path.resolve(__dirname, 'src/public')));
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})

app.use(logger('dev'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
// app.use('*', cloudinaryConfig);
app.use('/', routes)