//req
const express = require('express');
const gameController = require('../controllers/gameController');

//routes funciton
function routes(Game) {
    //game router
    const gameRouter = express.Router();
    //game controller
    const controller = gameController(Game);
    //get all games
    gameRouter.route('/')
        .get(controller.get);
    //get one game
    gameRouter.route('/:id')
        .get(controller.getOne);
    //add new game
    gameRouter.route('/new')
        .post(controller.add)
    //delete all games
    gameRouter.route('/delete/:id')
        .delete(controller.deleteOne);
    //return game router obj
    return gameRouter;
}
//export the routes
module.exports = routes;