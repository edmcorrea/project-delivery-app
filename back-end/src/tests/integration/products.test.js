const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const fs = require('fs');
const path = require('path');

const app = require('../../api/app');
const { Product } = require('../../database/models');
const { productsMock } = require('../mocks/productsMocks');

const { expect, use } = chai;
use(chaiHttp);

describe('integration tests for /products route', function() {
  afterEach(sinon.restore);

  it('tests if all products are returned', async function() {
    sinon.stub(Product, 'findAll').resolves(productsMock);

    const response = await chai
      .request(app)
      .get('/products');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(productsMock);
  });
});

describe('integration tests for /images routes', function() {
  it('tests if a specific image is returned', async function() {
    const imageFile = path.resolve(__dirname, '../../../public/heineken_600ml.jpg');
    const imageBuffer = fs.readFileSync(imageFile);

    const response = await chai
      .request(app)
      .get('/images/heineken_600ml.jpg');

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(imageBuffer);
  });
});
