import express from 'express'
import config from 'config'
import path from 'path'
import mongoose from 'mongoose'
import session from 'express-session'
import bodyParser from 'body-parser'
import authRoute from './routs/auth.js'
import mainRoute from './routs/main.js'
import settingsRoute from './routs/settings.js'
import { fileURLToPath } from 'url'

const app = express()
const PORT = process.env.PORT || config.get('port')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
}))
app.use('/api/auth', authRoute)
app.use('/api/main', mainRoute)
app.use('/api/settings', settingsRoute)

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

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
