const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../api/app');
const { User } = require('../../database/models');
const { adminMock } = require('../mocks/userMocks');

const { expect, use } = chai;
use(chaiHttp);

describe('integration tests for /login route', function() {
  afterEach(sinon.restore);

  it('tests a success login', async function() {
    sinon.stub(User, 'findOne').resolves(adminMock);

    const response = await chai
      .request(app)
      .post('/login')
      .send({
        email: adminMock.email,
        password: '--adm2@21!!--',
      });

    expect(response.status).to.be.equal(200);
    expect(response.body.name).to.be.equal(adminMock.name);
    expect(response.body.email).to.be.equal(adminMock.email);
    expect(response.body.role).to.be.equal(adminMock.role);
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
    sinon.stub(User, 'findOne').resolves(adminMock);

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
