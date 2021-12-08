const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const connect=require('./models');
connect()

app.use(bodyParser.json());
app.use(express.urlencoded({extended : false}));

const user = require('./routers/user')
app.use('/api', user)
const projects = require('./routers/project')
app.use('/api', projects)
const main = require('./routers/main')
app.use('/api', main)
const Todo = require("./routers/todo");
app.use("/api", Todo);
const circles = require("./routers/circles");
app.use("/api", circles);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/login', (req, res) => {
    res.render('login');
})
app.get('/projects', (req, res) => {
    res.render('projects');
})




app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})

