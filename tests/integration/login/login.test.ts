import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('POST /login', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Should return 400 if "username" is not sent', async function () {
    const userData = {
      password: 'password123',
    };

    const res = await chai.request(app).post('/login').send(userData);

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"username" and "password" are required');
  });

  it('Should return 400 if "password" is not sent', async function () {
    const userData = {
      username: 'testUser',
    };

    const res = await chai.request(app).post('/login').send(userData);

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"username" and "password" are required');
  });

  it('Should return 401 if username does not exist', async function () {
    const userData = {
      username: 'nonExistingUser',
      password: 'password123',
    };

    sinon.stub(UserModel, 'findOne').resolves(null);

    const res = await chai.request(app).post('/login').send(userData);

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Username or password invalid');
  });
});