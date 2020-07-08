function gameController(Game) {
    //get games
    function get(req, res) {
        Game.find((err, games) => {
            if(err) {
                return res.json(err);
            }
            return res.json(games);
        });
    }
    //get one game by id
    function getOne(req, res) {
        Game.findById(req.params.id, (err, game) => {
            if(err) { return res.json(err) }
            return res.json(game);
        });
    }
    //add new game
    function add(req, res) {
        const game = new Game(req.body);
        game.save();
        return res.status(201).json(game);
    }
    //delete single game
    function deleteOne(req, res) {
        Game.findById(req.params.id, (err, game) => {
            if(err) { return res.json(err) }
            game.deleteOne();
            return res.status(204).json('game deleted');
        });
    }
    //return list of available functions
    return { get, getOne, add, deleteOne };
}

module.exports = gameController;