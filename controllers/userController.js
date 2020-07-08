function userController(User) {
    //get all users
    function get(req, res) {
        User.find((err, users) => {
            if(err) { return res.send(err) }
            return res.json(users);
        });
    }
    //get one user
    function getOne(req, res) {
        User.findById(req.params.id, (err, user) => {
            if(err){ return res.json(err) }
            return res.json(user)
        });
    }
    //add new user
    function post (req, res) {
        //instantiate new user with req parameters
        const user = new User(req.body);
        //if username or password not submitted, return bad request 400
        if(!req.body.username || !req.body.password) { 
            res.status(400);
            return res.send('Username and Password are required');
        }
        //everything checks out, save user & return created status 201
        user.save();
        res.status(201);
        return res.send(`User ${user.username} created`);
    }
    //update user
    function patch(req, res) {
        //find user by id
        User.findById(req.params.id, (err, user) => {
            if(err){ return res.json(err) }
            //skip updating mongodb id if present
            if(req.body._id) { delete req.body._id }
            //iterate through each element passed through request and set to corresponding user value
            Object.entries(req.body).forEach((item) => {
                const key = item[0];
                const value = item[1];
                user[key] = value;
            });
            //save updated values
            user.save((err) => {
                if(err) { return res.json(err) }
                return res.json(user);
            });
        })
    }
    return { post, get, getOne, patch };
}

module.exports = userController;
