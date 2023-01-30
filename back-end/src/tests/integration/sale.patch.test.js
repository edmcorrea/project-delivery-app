const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../api/app');
const { Sale, User } = require('../../database/models');
const { customerMock, sellerMock } = require('../mocks/userMocks');
const { preparandoSaleMock, emTransitoSaleMock, unauthorizedSaleMock, pendenteSaleMock, entregueSaleMock } = require('../mocks/saleMocks');

const { expect, use } = chai;
use(chaiHttp);

describe('integration tests for /sale/status/id: route', function() {
  afterEach(sinon.restore);

  it('tests if it is possible to update the status from Pendente to Preparando', async function() {
    sinon.stub(User, 'findOne').resolves(sellerMock);
    sinon.stub(Sale, 'findByPk')
      .onFirstCall().resolves(pendenteSaleMock)
      .onSecondCall().resolves({
        id: preparandoSaleMock.id,
        status: preparandoSaleMock.status,
      });
    sinon.stub(Sale, 'update').resolves({});

    const response = await chai
      .request(app)
      .patch('/sale/status/1')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MiwidXNlckVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzQ4NDU3NTQsImV4cCI6MTY4NTIxMzc1NH0.WjRcVrsRiLYTsRyuXhD_zVNIrPd293GDfGEdmpSnlcE',
      );

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({
      id: preparandoSaleMock.id,
      status: preparandoSaleMock.status,
    });
  });

  it('tests if it is possible to update the status from Preparando to Em trânsito', async function() {
    sinon.stub(User, 'findOne').resolves(sellerMock);
    sinon.stub(Sale, 'findByPk')
      .onFirstCall().resolves(preparandoSaleMock)
      .onSecondCall().resolves({
        id: emTransitoSaleMock.id,
        status: emTransitoSaleMock.status,
      });
    sinon.stub(Sale, 'update').resolves({});

    const response = await chai
      .request(app)
      .patch('/sale/status/1')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MiwidXNlckVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzQ4NDU3NTQsImV4cCI6MTY4NTIxMzc1NH0.WjRcVrsRiLYTsRyuXhD_zVNIrPd293GDfGEdmpSnlcE',
      );

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({
      id: emTransitoSaleMock.id,
      status: emTransitoSaleMock.status,
    });
  });

  it('tests if it is possible to update the status from Em trânsito to Entregue', async function() {
    sinon.stub(User, 'findOne').resolves(customerMock);
    sinon.stub(Sale, 'findByPk')
      .onFirstCall().resolves(emTransitoSaleMock)
      .onSecondCall().resolves({
        id: entregueSaleMock.id,
        status: entregueSaleMock.status,
      });
    sinon.stub(Sale, 'update').resolves({});

    const response = await chai
      .request(app)
      .patch('/sale/status/1')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MywidXNlckVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIn0sImlhdCI6MTY3NDY4NDMwMywiZXhwIjoxNjc1OTgwMzAzfQ.4JEj8Rh-NICQgnJUPCs3dP-ZwztTaIE1VCkTJFzcNcg',
      );

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({
      id: entregueSaleMock.id,
      status: entregueSaleMock.status,
    });
  });

  it('tests if it is not possible to update the status without a token', async function() {
    const response = await chai.request(app).patch('/sale/status/1');

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Token is required');
  });

  it('tests if it is not possible to update with an invalid token', async function() {
    const response = await chai
      .request(app)
      .patch('/sale/status/1')
      .set('authorization', 'invalidToken');

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Expired or invalid token');
  });

  it('tests if it is not possible to update the status with a token from an invalid user', async function() {
    sinon.stub(User, 'findOne').resolves(undefined);

    const response = await chai
      .request(app)
      .patch('/sale/status/1')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MywidXNlckVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIn0sImlhdCI6MTY3NDY4NDMwMywiZXhwIjoxNjc1OTgwMzAzfQ.4JEj8Rh-NICQgnJUPCs3dP-ZwztTaIE1VCkTJFzcNcg',
      );

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Expired or invalid token');
  });

  it('tests if it is not possible to update the status with an invalid sale id', async function() {
    sinon.stub(User, 'findOne').resolves(customerMock);
    sinon.stub(Sale, 'findByPk').onFirstCall().resolves(undefined);

    const response = await chai
      .request(app)
      .patch('/sale/status/93')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MywidXNlckVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIn0sImlhdCI6MTY3NDY4NDMwMywiZXhwIjoxNjc1OTgwMzAzfQ.4JEj8Rh-NICQgnJUPCs3dP-ZwztTaIE1VCkTJFzcNcg'
      );

    expect(response.status).to.be.equal(404);
    expect(response.body.message).to.be.deep.equal('Sale not found');
  });

  it('tests if it is not possible to update the status by an invalid user or seller', async function() {
    sinon.stub(User, 'findOne').resolves(customerMock);
    sinon.stub(Sale, 'findByPk').onFirstCall().resolves(unauthorizedSaleMock);

    const response = await chai
      .request(app)
      .patch('/sale/status/7')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MywidXNlckVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIn0sImlhdCI6MTY3NDY4NDMwMywiZXhwIjoxNjc1OTgwMzAzfQ.4JEj8Rh-NICQgnJUPCs3dP-ZwztTaIE1VCkTJFzcNcg'
      );

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.deep.equal('Unauthorized operation');
  });

  it('tests if it is not possible to update the status by the seller, from Em Trânsito', async function() {
    sinon.stub(User, 'findOne').resolves(sellerMock);
    sinon.stub(Sale, 'findByPk').onFirstCall().resolves(emTransitoSaleMock);

    const response = await chai
      .request(app)
      .patch('/sale/status/1')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MiwidXNlckVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzQ4NDU3NTQsImV4cCI6MTY4NTIxMzc1NH0.WjRcVrsRiLYTsRyuXhD_zVNIrPd293GDfGEdmpSnlcE'
      );

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.deep.equal('Unauthorized operation');
  });
});

