const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../api/app');
const { Sale, SaleProduct, Product, User } = require('../../database/models');

const { expect, use } = chai;
use(chaiHttp);

describe('integration tests for /sale route', function() {
  afterEach(sinon.restore);

  it('tests a success sale insert', async function() {
    sinon.stub(Product, 'findAndCountAll').resolves({ count: 2 });
    sinon.stub(User, 'findOne').resolves({
      id: 3,
      name: 'Cliente Zé Birita',
      email: 'zebirita@email.com',
      password: '1c37466c159755ce1fa181bd247cb925',
      role: 'customer',
    });

    const response = await chai
      .request(app)
      .post('/user')
      .send({
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com',
        password: '$#zebirita#$',
      });

    expect(response.status).to.be.equal(201);
    expect(response.body.name).to.be.equal('Cliente Zé Birita');
    expect(response.body.email).to.be.equal('zebirita@email.com');
    expect(response.body.role).to.be.equal('customer');
    expect(response.body.token).to.be.string;
  });

  it('tests if is not possible to create a sale without a token', async function() {
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      password: 'a4c86edecc5aee06eff8fdeda69e0d04',
      role: 'administrator',
    });

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

  it('tests if is not possible to create a sale with a invalid total price', async function() {
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
  
  it('tests if is not possible to create a sale with a not found product', async function() {
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

  it('tests if is not possible to create a sale with an invalid token', async function() {
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

  it('tests if is not possible to create a sale with a token from an invalid user', async function() {
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

  it('tests if is not possible to create a sale with an invalid seller name', async function() {
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

  it('tests if is not possible to create a sale with an invalid role', async function() {
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
  
});