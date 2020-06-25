const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const shortid = require('shortid')

module.exports.index = function (req, res) {
    res.send('Index Page')
}

module.exports.users = function(req, res){
    res.render('users/index', {
        users: db.get('users').value()
    });
}

module.exports.usersSearch = function(req, res){
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {users: matchedUsers});
}

module.exports.userCreateGet = function(req, res){
    res.render('users/create');
}

module.exports.userCreatePost = function(req, res){
    req.body.id = shortid.generate()
    db.get('users')
      .push(req.body)
      .write();
    res.redirect('/users');
}

module.exports.getParams = function(req, res){
    var index = (req.params.id)
    var user = db.get('users').find({id: index}).value()
    res.render('users/view',{user: user})
}