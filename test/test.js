// Testing Modules
const rp = require('request-promise');
const chai = require('chai');
const expect = chai.expect;

// Server connection
const PORT = 3000;
const apiUrl = `http://localhost:${PORT}`;
const app = require('../src/server');
let server;

describe('Nodejs Test', () => {

    before(done => {
      server = app.listen(PORT, () =>{
        done();
      });
    });

    describe('First Test', async () => {
      expect(true);
    });

    after(done => {
      server.close(done);
    });
});
