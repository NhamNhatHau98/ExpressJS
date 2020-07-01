module.exports.createUserPost = function(req, res, next){
    var errors = []
    if(!req.body.name){
        errors.push('Name is rquired')
    }
    if(!req.body.phone){
        errors.push('Phone number is required')
    }
    if(errors.length){
        res.render('users/create', {
            errors: errors,
            values: req.body
        })
        return;
    }

    res.locals.sucess=true
    next()
}