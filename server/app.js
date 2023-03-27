const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')
const authRouts = require('./routs/auth')
const mainRouts = require('./routs/main')
const settingsRouts = require('./routs/settings')
const app = express()

const PORT = config.get('port') || 5000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
}))
app.use('/api/auth', authRouts)
app.use('/api/main', mainRouts)
app.use('/api/settings', settingsRouts)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  } catch (e) {
    console.log('server error', e.message)
    process.exit(1)
  }
}

start()
