const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../api/app');
const { User } = require('../../database/models');
const { customerMock, adminMock, sellerMock } = require('../mocks/userMocks');

const { expect, use } = chai;
use(chaiHttp);

describe('integration tests for /user route', function() {
  afterEach(sinon.restore);

  it('tests a success user insert by customer', async function() {
    sinon.stub(User, 'findOne').resolves(undefined);
    sinon.stub(User, 'create').resolves(customerMock);

    const response = await chai
      .request(app)
      .post('/user')
      .send({
        name: customerMock.name,
        email: customerMock.email,
        password: '$#zebirita#$',
      });

    expect(response.status).to.be.equal(201);
    expect(response.body.name).to.be.equal(customerMock.name);
    expect(response.body.email).to.be.equal(customerMock.email);
    expect(response.body.role).to.be.equal(customerMock.role);
    expect(response.body.token).to.be.string;
  });

  it('tests if is not possible to create an user that already exists, by a customer', async function() {
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

  it('tests if is not possible to create an user with a short password(min 6), by a customer', async function() {
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
  
  it('tests if is not possible to create an user with a short name(min 12), by a customer', async function() {
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

  it('tests if is not possible to create an user with an invalid email, by a customer', async function() {
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
  
  it('tests a success user insert by administrator', async function() {
    sinon.stub(User, 'findOne')
      .onFirstCall().resolves(adminMock)
      .onSecondCall().resolves(undefined);
    sinon.stub(User, 'create').resolves(sellerMock);

    const response = await chai
      .request(app)
      .post('/user/admin')
      .send({
        name: sellerMock.name,
        email: sellerMock.email,
        password: 'fulana@123',
        role: sellerMock.role,
      }).set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MSwidXNlckVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzUxMDUyMzksImV4cCI6MTY4NTQ3MzIzOX0.HV6Qg0JJY76YW_1Z3dxXpItI9iGozHiIU2-e09R_RJ0',
      );

    expect(response.status).to.be.equal(201);
    expect(response.body.name).to.be.equal(sellerMock.name);
    expect(response.body.email).to.be.equal(sellerMock.email);
    expect(response.body.role).to.be.equal(sellerMock.role);
    expect(response.body.token).to.be.string;
  });

  it('tests if is not possible to create an user by administrator without a token', async function() {
    const response = await chai
      .request(app)
      .post('/user/admin')
      .send({
        name: sellerMock.name,
        email: sellerMock.email,
        password: 'fulana@123',
        role: sellerMock.role,
      });
    
    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Token is required');
  });

  it('tests if is not possible to create an user by administrator with an invalid token', async function() {
    const response = await chai
      .request(app)
      .post('/user/admin')
      .send({
        name: sellerMock.name,
        email: sellerMock.email,
        password: 'fulana@123',
        role: sellerMock.role,
      }).set('authorization', 'invalidToken');

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Expired or invalid token');
  });

  it('tests if is not possible to create a user by administrator with a token from an invalid user', async function() {
    sinon.stub(User, 'findOne').resolves(customerMock);

    const response = await chai
      .request(app)
      .post('/user/admin')
      .send({
        name: sellerMock.name,
        email: sellerMock.email,
        password: 'fulana@123',
        role: sellerMock.role,
      }).set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MywidXNlckVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIn0sImlhdCI6MTY3NDY4NDMwMywiZXhwIjoxNjc1OTgwMzAzfQ.4JEj8Rh-NICQgnJUPCs3dP-ZwztTaIE1VCkTJFzcNcg',
      );
    
    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Expired or invalid token');
  });

  it('tests if is not possible to create a user that already exists, by administrator', async function() {
    sinon.stub(User, 'findOne')
      .onFirstCall().resolves(adminMock)
      .onSecondCall().resolves(sellerMock);

    const response = await chai
      .request(app)
      .post('/user/admin')
      .send({
        name: sellerMock.name,
        email: sellerMock.email,
        password: 'fulana@123',
        role: sellerMock.role,
      }).set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MSwidXNlckVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzUxMDUyMzksImV4cCI6MTY4NTQ3MzIzOX0.HV6Qg0JJY76YW_1Z3dxXpItI9iGozHiIU2-e09R_RJ0',
      );

    expect(response.status).to.be.equal(409);
    expect(response.body.message).to.be.equal('User already registered');
  });
});