const express = require('express')
const exphbs = require('express-handlebars')
const usePassport = require('./config/passport')
const passport = require('passport')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const routes = require('./routes')
const flash = require('connect-flash')

const db = require('./models')
const Todo = db.Todo
const User = db.User

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})