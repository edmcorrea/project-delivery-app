const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../api/app');
const { User } = require('../../database/models');
const { customerMock, adminMock, sellerListMock } = require('../mocks/userMocks');

const { expect, use } = chai;
use(chaiHttp);

describe('integration tests for /user route', function() {
  afterEach(sinon.restore);

  it('tests a success user insert', async function() {
    sinon.stub(User, 'findOne').resolves(undefined);
    sinon.stub(User, 'create').resolves(customerMock);

    const response = await chai
      .request(app)
      .post('/user')
      .send({
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com',
        password: '$#zebirita#$',
      });

    expect(response.status).to.be.equal(201);
    expect(response.body.name).to.be.equal(customerMock.name);
    expect(response.body.email).to.be.equal(customerMock.email);
    expect(response.body.role).to.be.equal(customerMock.role);
    expect(response.body.token).to.be.string;
  });

  it('tests if is not possible to create a user that already exists', async function() {
    sinon.stub(User, 'findOne').resolves(adminMock);

    const response = await chai
      .request(app)
      .post('/user')
      .send({
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: '--adm2@21!!--',
      });

    expect(response.status).to.be.equal(409);
    expect(response.body.message).to.be.equal('User already registered');
  });

  it('tests if is not possible to create a user with a short password(min 6)', async function() {
    const response = await chai
      .request(app)
      .post('/user')
      .send({
        name: 'Name Test ok',
        email: 'tesemail@email.com',
        password: 'pass',
      });

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('\"password\" length must be at least 6 characters long');
  });
  
  it('tests if is not possible to create a user with a short name(min 12)', async function() {
    const response = await chai
      .request(app)
      .post('/user')
      .send({
        name: 'Name',
        email: 'tesemail@email.com',
        password: '1234567',
      });

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('\"name\" length must be at least 12 characters long');
  });

  it('tests if is not possible to create a user with an invalid email', async function() {
    const response = await chai
      .request(app)
      .post('/user')
      .send({
        name: 'Name Test OK',
        email: 'email',
        password: '1234567',
      });

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('\"email\" must be a valid email');
  });

  it('tests if all sellers are returned', async function() {
    sinon.stub(User, 'findAll').resolves(sellerListMock);

    const response = await chai
      .request(app)
      .get('/user/sellers');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(sellerListMock);
  });
  
});