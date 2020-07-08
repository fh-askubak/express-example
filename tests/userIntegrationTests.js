//requirements
const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app.js');

const User = mongoose.model('User');
//super test agent run app
const agent = request.agent(app);

//User CRUD tests
describe('User CRUD Test', () => {
    //mock user
    const userPost = { username: 'username', password: 'pswrd' };
    //send post request to endpoint
    agent.post('/api/users/new')
    .send(userPost)
    .expect(201)
    .end((err, results) => {
        console.log(results);
        should(results.body.username).not.be.null;
        should(results.text).equal(`User ${userPost.username} created`);
        done();
    });

    afterEach((done) => {
        User.deleteMany({}).exec();
        done();
    });

    after((done) => {
        mongoose.connection.close();
        app.server.close(done);
    })
});