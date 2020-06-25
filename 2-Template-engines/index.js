const express = require('express');
const app = express();
const port = 3000;
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const usersRoute = require('./router/router')
const shortid = require('shortid')

db.defaults({users: []})
  .write();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// app.get('/', (req, res) => {
//     res.render('index');
// });
app.use('/', usersRoute)

// app.get('/users', (req, res) =>{
//     res.render('users/index', {
//         users: db.get('users').value()
//     });
// })
app.use('/users', usersRoute)

// app.get('/users/search', (req, res) =>{
//     var q = req.query.q;
//     var matchedUsers = db.get('users').value().filter(function(user){
//         return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
//     });
//     res.render('users/index', {users: matchedUsers});
// })
app.use('/users/search', usersRoute)

// app.get('/users/create', (req, res) =>{
//     res.render('users/create');
// })
app.use('/users/create', usersRoute)

// app.get('/users/:id', (req, res)=>{
//     //console.log(req.params.id)
//     var index = (req.params.id)
//     var user = db.get('users').find({id: index}).value()
//     res.render('users/view',{user: user})
// })
app.use('/users/:id', usersRoute)

// app.post('/users/create', (req, res) =>{
//     req.body.id = shortid.generate()
//     db.get('users')
//       .push(req.body)
//       .write();
//     res.redirect('/users');
// })
app.use('/users/create', usersRoute)

app.listen(port, () => console.log(`Server listening on port: ${port}`));




