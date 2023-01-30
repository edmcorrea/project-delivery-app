const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../api/app');
const { User } = require('../../database/models');
const { sellerListMock, userListMock } = require('../mocks/userMocks');

const { expect, use } = chai;
use(chaiHttp);

describe('integration tests for /user route', function() {
  afterEach(sinon.restore);

  it('tests if all sellers are returned', async function() {
    sinon.stub(User, 'findAll').resolves(sellerListMock);

    const response = await chai
      .request(app)
      .get('/user/sellers');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(sellerListMock);
  });

  it('tests if all users are returned(without administrators)', async function() {
    sinon.stub(User, 'findAll').resolves(userListMock);

    const response = await chai
      .request(app)
      .get('/user');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(userListMock);
  });
});