const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../api/app');
const { Product } = require('../../database/models');

const { expect, use } = chai;
use(chaiHttp);

describe('integration tests for /products route', function() {
  afterEach(sinon.restore);

  it('tests if all products are returned', async function() {
    const products = [
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: 2.20,
        url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      },
      {
        id: 2,
        name: 'Heineken 600ml',
        price: 7.50,
        url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
      },
      {
        id: 3,
        name: 'Antarctica Pilsen 300ml',
        price: 2.49,
        url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
      },
    ];
    sinon.stub(Product, 'findAll').resolves(products);

    const response = await chai
      .request(app)
      .get('/products')

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(products);
  });
});
