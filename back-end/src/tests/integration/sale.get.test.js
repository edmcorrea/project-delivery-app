const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../api/app');
const { Sale, User } = require('../../database/models');
const { salesFromCustomer, rawSaleMock, formatedSaleMock } = require('../mocks/saleMocks');
const { customerMock, sellerMock, adminMock } = require('../mocks/userMocks');

const { expect, use } = chai;
use(chaiHttp);

describe('integration tests for /sale route', function() {
  afterEach(sinon.restore);

  it('tests if all sales from a specific user are returned', async function() {
    sinon.stub(User, 'findOne').resolves(customerMock);
    sinon.stub(Sale, 'findAll').resolves(salesFromCustomer);

    const response = await chai
      .request(app)
      .get('/sale')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MywidXNlckVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIn0sImlhdCI6MTY3NDY4NDMwMywiZXhwIjoxNjc1OTgwMzAzfQ.4JEj8Rh-NICQgnJUPCs3dP-ZwztTaIE1VCkTJFzcNcg'
      );

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(salesFromCustomer);
  });

  it('tests if is not possible to get sales without a token', async function() {
    const response = await chai.request(app).get('/sale');

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Token is required');
  });

  it('tests if is not possible to get sales with an invalid token', async function() {
    const response = await chai
      .request(app)
      .get('/sale')
      .set('authorization', 'invalidToken');

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Expired or invalid token');
  });

  it('tests if is not possible to get sales with a token from an invalid user', async function() {
    sinon.stub(User, 'findOne').resolves(undefined);

    const response = await chai
      .request(app)
      .get('/sale')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MywidXNlckVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIn0sImlhdCI6MTY3NDY4NDMwMywiZXhwIjoxNjc1OTgwMzAzfQ.4JEj8Rh-NICQgnJUPCs3dP-ZwztTaIE1VCkTJFzcNcg',
      );

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Expired or invalid token');
  });

  it('tests if a specific sale is return', async function() {
    sinon.stub(Sale, 'findByPk').resolves(rawSaleMock);
    sinon.stub(User, 'findOne').resolves(customerMock);
    sinon.stub(User, 'findByPk').resolves(sellerMock);

    const response = await chai
      .request(app)
      .get('/sale/1')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MywidXNlckVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIn0sImlhdCI6MTY3NDY4NDMwMywiZXhwIjoxNjc1OTgwMzAzfQ.4JEj8Rh-NICQgnJUPCs3dP-ZwztTaIE1VCkTJFzcNcg'
      );

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(formatedSaleMock);
  });

  it('tests if is not possible to get a specific sale without a token', async function() {
    const response = await chai.request(app).get('/sale/1');

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Token is required');
  });

  it('tests if is not possible to get a specific sale with an invalid id', async function() {
    sinon.stub(Sale, 'findByPk').resolves(undefined);

    const response = await chai
      .request(app)
      .get('/sale/55')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MywidXNlckVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIn0sImlhdCI6MTY3NDY4NDMwMywiZXhwIjoxNjc1OTgwMzAzfQ.4JEj8Rh-NICQgnJUPCs3dP-ZwztTaIE1VCkTJFzcNcg'
      );

    expect(response.status).to.be.equal(404);
    expect(response.body.message).to.be.deep.equal('Sale not found');
  });

  it('tests if is not possible to get a specific sale with an invalid token', async function() {
    sinon.stub(Sale, 'findByPk').resolves(rawSaleMock);

    const response = await chai
      .request(app)
      .get('/sale/1')
      .set('authorization', 'invalidToken');

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Expired or invalid token');
  });

  it('tests if is not possible to get a specific sale with a token from an invalid user', async function() {
    sinon.stub(Sale, 'findByPk').resolves(rawSaleMock);
    sinon.stub(User, 'findOne').resolves(undefined);

    const response = await chai
      .request(app)
      .get('/sale/1')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MywidXNlckVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIn0sImlhdCI6MTY3NDY4NDMwMywiZXhwIjoxNjc1OTgwMzAzfQ.4JEj8Rh-NICQgnJUPCs3dP-ZwztTaIE1VCkTJFzcNcg',
      );

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Expired or invalid token');
  });

  it('tests if is not possible to get a specific sale using a token from another user', async function() {
    sinon.stub(Sale, 'findByPk').resolves(rawSaleMock);
    sinon.stub(User, 'findOne').resolves(adminMock);
    
    const response = await chai
      .request(app)
      .get('/sale/3')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MywidXNlckVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIn0sImlhdCI6MTY3NDY4NDMwMywiZXhwIjoxNjc1OTgwMzAzfQ.4JEj8Rh-NICQgnJUPCs3dP-ZwztTaIE1VCkTJFzcNcg',
      );

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('This sale does not belog to the current user');
  });
});
