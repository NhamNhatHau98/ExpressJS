const express = require('express');
const app = express();
const port = 3000;
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({users: []})
  .write();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var users=[
    {id:1, name: 'Tony'},
    {id:2, name: 'Tom'},
    {id:3, name: 'Maria'},
    {id:4, name: 'Peter'},
    {id:5, name: 'Nick'},
    {id:6, name: 'John'}
];

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/users', (req, res) =>{
    res.render('users/index', {
        users: db.get('users').value()
    });
})

app.get('/users/search', (req, res) =>{
    var q = req.query.q;
    var matchedUsers = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {users: matchedUsers});
})

app.get('/users/create', (req, res) =>{
    res.render('users/create');
})

app.post('/users/create', (req, res) =>{
    //console.log(req.body);
    db.get('users')
      .push(req.body)
      .write();
    res.redirect('/users');
})

app.listen(port, () => console.log(`Server listening on port: ${port}`));




