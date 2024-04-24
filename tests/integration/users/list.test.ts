import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import UserService from '../../../src/services/userServices';

chai.use(chaiHttp);

describe('GET /users', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Should list all users', async function () {
    const users = [
      {
        id: 1,
        username: 'Hagar',
        vocation: 'Guerreiro',
        level: 10,
        password: 'hashed_password',
        productIds: [{ id: 1 }, { id: 2 }],
      },
      {
        id: 2,
        username: 'Eddie',
        vocation: 'Guerreiro',
        level: 8,
        password: 'hashed_password',
        productIds: [{ id: 3 }, { id: 4 }],
      },
      {
        id: 3,
        username: 'Helga',
        vocation: 'Curandeira',
        level: 9,
        password: 'hashed_password',
        productIds: [{ id: 5 }],
      },
    ];

    sinon.stub(UserService, 'listUsers').resolves(users as any);

    const res = await chai.request(app).get('/users');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(users);
  });
});