const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../api/app');
const { User } = require('../../database/models');
const { sellerListMock, userListMock, adminMock, customerMock } = require('../mocks/userMocks');

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

  it('tests if all users are returned (without administrators)', async function() {
    sinon.stub(User, 'findAll').resolves(userListMock);

    const response = await chai
      .request(app)
      .get('/user');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(userListMock);
  });

  it('tests if it is possible to remove an user by id', async function() {
    sinon.stub(User, 'findOne').resolves(adminMock);
    sinon.stub(User, 'findByPk').resolves(customerMock);
    sinon.stub(User, 'destroy').resolves({});

    const response = await chai
      .request(app)
      .delete('/user/3')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MSwidXNlckVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzUxMDUyMzksImV4cCI6MTY4NTQ3MzIzOX0.HV6Qg0JJY76YW_1Z3dxXpItI9iGozHiIU2-e09R_RJ0',
      );

    expect(response.status).to.be.equal(204);
  });
  
  it('tests if is not possible to remove an user by administrator without a token', async function() {
    const response = await chai
      .request(app)
      .delete('/user/3')
    
    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Token is required');
  });

  it('tests if is not possible to remove an user by administrator with an invalid token', async function() {
    const response = await chai
      .request(app)
      .delete('/user/3')
      .set('authorization', 'invalidToken');

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Expired or invalid token');
  });

  it('tests if is not possible to remove an user by administrator with a token from an invalid user', async function() {
    sinon.stub(User, 'findOne').resolves(customerMock);

    const response = await chai
      .request(app)
      .delete('/user/3')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MywidXNlckVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIn0sImlhdCI6MTY3NDY4NDMwMywiZXhwIjoxNjc1OTgwMzAzfQ.4JEj8Rh-NICQgnJUPCs3dP-ZwztTaIE1VCkTJFzcNcg',
      );
    
    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Expired or invalid token');
  });

  it('tests if is not possible to remove an user that does not exist', async function() {
    sinon.stub(User, 'findOne').resolves(adminMock);
    sinon.stub(User, 'findByPk').resolves(undefined);

    const response = await chai
      .request(app)
      .delete('/user/9')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MSwidXNlckVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzUxMDUyMzksImV4cCI6MTY4NTQ3MzIzOX0.HV6Qg0JJY76YW_1Z3dxXpItI9iGozHiIU2-e09R_RJ0',
      );
    
    expect(response.status).to.be.equal(404);
    expect(response.body.message).to.be.equal('User does not exist');
  });
});