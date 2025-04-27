const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Task = require('../models/Task');

const should = chai.should();
chai.use(chaiHttp);

describe('Tasks API', () => {
  beforeEach(async () => {
    await Task.deleteMany({});
  });

  describe('GET /api/tasks', () => {
    it('it should GET all the tasks', (done) => {
      chai.request(server)
        .get('/api/tasks')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('POST /api/task', () => {
    it('it should not POST a task without title', (done) => {
      let task = {
        description: 'Test task'
      };
      chai.request(server)
        .post('/api/task')
        .send(task)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message');
          done();
        });
    });

    it('it should POST a task', (done) => {
      let task = {
        title: 'Test task',
        description: 'Test description',
        completed: false
      };
      chai.request(server)
        .post('/api/task')
        .send(task)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('_id');
          res.body.should.have.property('title').eql('Test task');
          done();
        });
    });
  });

  describe('PUT /api/task/:id', () => {
    it('it should UPDATE a task given the id', (done) => {
      let task = new Task({ title: 'Old title', completed: false });
      task.save((err, task) => {
        chai.request(server)
          .put('/api/task/' + task._id)
          .send({ title: 'New title', completed: true })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('title').eql('New title');
            res.body.should.have.property('completed').eql(true);
            done();
          });
      });
    });
  });

  describe('DELETE /api/task/:id', () => {
    it('it should DELETE a task given the id', (done) => {
      let task = new Task({ title: 'Task to delete' });
      task.save((err, task) => {
        chai.request(server)
          .delete('/api/task/' + task._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Task deleted');
            done();
          });
      });
    });
  });
});
