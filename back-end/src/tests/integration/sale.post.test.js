const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../api/app');
const { Sale, SaleProduct, Product, User } = require('../../database/models');
const { pendenteSaleMock, saleProductMock } = require('../mocks/saleMocks');
const { customerMock, sellerMock } = require('../mocks/userMocks');

const { expect, use } = chai;
use(chaiHttp);

describe('integration tests for /sale route', function() {
  afterEach(sinon.restore);

  it('tests a success sale insert', async function() {
    sinon.stub(Product, 'findAndCountAll').resolves({ count: saleProductMock.length });
    sinon.stub(User, 'findOne')
      .onFirstCall().resolves(customerMock)
      .onSecondCall().resolves(sellerMock);
    sinon.stub(Sale, 'create').resolves(pendenteSaleMock);
    sinon.stub(SaleProduct, 'bulkCreate').resolves(saleProductMock);

    const response = await chai
      .request(app)
      .post('/sale')
      .send({
        sellerName: sellerMock.name,
        totalPrice: pendenteSaleMock.totalPrice,
        deliveryAddress: pendenteSaleMock.deliveryAddress,
        deliveryNumber: pendenteSaleMock.deliveryNumber,
        products: [
          { id: saleProductMock[0].productId, quantity: saleProductMock[0].quantity },
          { id: saleProductMock[1].productId, quantity: saleProductMock[1].quantity },
        ],
      }).set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MywidXNlckVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIn0sImlhdCI6MTY3NDY4NDMwMywiZXhwIjoxNjc1OTgwMzAzfQ.4JEj8Rh-NICQgnJUPCs3dP-ZwztTaIE1VCkTJFzcNcg',
      );

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal({ id: pendenteSaleMock.id });
  });

  it('tests if is not possible to create a sale without a token', async function() {
    const response = await chai
      .request(app)
      .post('/sale')
      .send({
        sellerName: sellerMock.name,
        totalPrice: pendenteSaleMock.totalPrice,
        deliveryAddress: pendenteSaleMock.deliveryAddress,
        deliveryNumber: pendenteSaleMock.deliveryNumber,
        products: [
          { id: saleProductMock[0].productId, quantity: saleProductMock[0].quantity },
          { id: saleProductMock[1].productId, quantity: saleProductMock[1].quantity },
        ],
      });

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Token is required');
  });

  it('tests if is not possible to create a sale with a invalid total price', async function() {
    const response = await chai
      .request(app)
      .post('/sale')
      .send({
        sellerName: sellerMock.name,
        totalPrice: '520.4abc69',
        deliveryAddress: pendenteSaleMock.deliveryAddress,
        deliveryNumber: pendenteSaleMock.deliveryNumber,
        products: [
          { id: saleProductMock[0].productId, quantity: saleProductMock[0].quantity },
          { id: saleProductMock[1].productId, quantity: saleProductMock[1].quantity },
        ],
      }).set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MywidXNlckVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIn0sImlhdCI6MTY3NDY4NDMwMywiZXhwIjoxNjc1OTgwMzAzfQ.4JEj8Rh-NICQgnJUPCs3dP-ZwztTaIE1VCkTJFzcNcg',
      );

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('\"totalPrice\" must be a number');
  });
  
  it('tests if is not possible to create a sale with a not found product', async function() {
    sinon.stub(Product, 'findAndCountAll').resolves({ count: 1 });

    const response = await chai
      .request(app)
      .post('/sale')
      .send({
        sellerName: sellerMock.name,
        totalPrice: pendenteSaleMock.totalPrice,
        deliveryAddress: pendenteSaleMock.deliveryAddress,
        deliveryNumber: pendenteSaleMock.deliveryNumber,
        products: [
          { id: 45, quantity: saleProductMock[0].quantity },
          { id: saleProductMock[1].productId, quantity: saleProductMock[1].quantity },
        ],
      }).set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MywidXNlckVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIn0sImlhdCI6MTY3NDY4NDMwMywiZXhwIjoxNjc1OTgwMzAzfQ.4JEj8Rh-NICQgnJUPCs3dP-ZwztTaIE1VCkTJFzcNcg'
      );

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('One or more product ids are invalid');
  });

  it('tests if is not possible to create a sale with an invalid token', async function() {
    sinon.stub(Product, 'findAndCountAll').resolves({ count: saleProductMock.length });

    const response = await chai
      .request(app)
      .post('/sale')
      .send({
        sellerName: sellerMock.name,
        totalPrice: pendenteSaleMock.totalPrice,
        deliveryAddress: pendenteSaleMock.deliveryAddress,
        deliveryNumber: pendenteSaleMock.deliveryNumber,
        products: [
          { id: saleProductMock[0].productId, quantity: saleProductMock[0].quantity },
          { id: saleProductMock[1].productId, quantity: saleProductMock[1].quantity },
        ],
      }).set('authorization', 'invalidToken');

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Expired or invalid token');
  });

  it('tests if is not possible to create a sale with a token from an invalid user', async function() {
    sinon.stub(Product, 'findAndCountAll').resolves({ count: saleProductMock.length });
    sinon.stub(User, 'findOne').resolves(undefined);

    const response = await chai
      .request(app)
      .post('/sale')
      .send({
        sellerName: sellerMock.name,
        totalPrice: pendenteSaleMock.totalPrice,
        deliveryAddress: pendenteSaleMock.deliveryAddress,
        deliveryNumber: pendenteSaleMock.deliveryNumber,
        products: [
          { id: saleProductMock[0].productId, quantity: saleProductMock[0].quantity },
          { id: saleProductMock[1].productId, quantity: saleProductMock[1].quantity },
        ],
      }).set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MywidXNlckVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIn0sImlhdCI6MTY3NDY4NDMwMywiZXhwIjoxNjc1OTgwMzAzfQ.4JEj8Rh-NICQgnJUPCs3dP-ZwztTaIE1VCkTJFzcNcg',
      );

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Expired or invalid token');
  });  
});
