process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
var Admin = require('../models/adminModel');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Admin', () => {
    beforeEach((done) => { //Before each test we empty the database
        Admin.remove({}, (err) => { 
           done();           
        });        
    });
/*
  * Test the /GET route
  */
  describe('/GET admin', () => {
      it('it should GET all the admins', (done) => {
        chai.request(server)
            .get('/book')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});