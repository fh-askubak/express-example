//requirements
const should = require('should');
const sinon = require('sinon');
const userController = require('../controllers/userController');

//describe function to test controller
describe('User Controller Tests:', () => {
    //test our Post functions
    describe('POST', () => {
        //test if empty fields
        it('should not allow an empty username or password', () => {
            //mock user
            const User = function (user) { this.save = () => {} };
            //mock request
            const req = {
                body: {
                    password: 'pswrd'
                }
            };
            //setup sinon response spy
            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            };
            //controller with mock user
            const controller = userController(User);
            //post user to controller
            controller.post(req, res);
            //declare what response should be
            res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
            res.send.calledWith('Username and Password are required').should.equal(true);
        });
        //test successful creation
        it('should create a new user', () => {
            //mock user
            const User = function (user) { this.save = () => {} };
            //mock request
            const req = {
                body: {
                    username: 'heyo',
                    password: 'pswrd'
                }
            };
            //setup sinon response spy
            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            };
            //controller with mock user
            const controller = userController(User);
            //post user to controller
            controller.post(req, res);
            //declare what response should be
            res.status.calledWith(201).should.equal(true);
            res.send.calledWith(`User ${User.username} created`);
        })
    });
});

