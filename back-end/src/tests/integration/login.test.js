const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../api/app');
const { User } = require('../../database/models');

const { expect, use } = chai;
use(chaiHttp);

describe('integration tests for /login route', function() {
  afterEach(sinon.restore);

  it('tests a success login', async function() {
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      password: 'a4c86edecc5aee06eff8fdeda69e0d04',
      role: 'administrator',
    });

    const response = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'adm@deliveryapp.com',
        password: '--adm2@21!!--',
      });

    expect(response.status).to.be.equal(200);
    expect(response.body.name).to.be.equal('Delivery App Admin');
    expect(response.body.email).to.be.equal('adm@deliveryapp.com');
    expect(response.body.role).to.be.equal('administrator');
    expect(response.body.token).to.be.string;
  });

  it('tests a login attemp with a invalid email', async function() {
    sinon.stub(User, 'findOne').resolves(undefined);

    const response = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'test@mail.com',
        password: '--adm2@21!!--',
      });

    expect(response.status).to.be.equal(404);
    expect(response.body.message).to.be.equal('Invalid login');
  });

  it('tests a login attemp with a invalid password', async function() {
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      password: 'a4c86edecc5aee06eff8fdeda69e0d04',
      role: 'administrator',
    });

    const response = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'adm@deliveryapp.com',
        password: 'invalidPass',
      });

    expect(response.status).to.be.equal(404);
    expect(response.body.message).to.be.equal('Invalid login');
  });
});