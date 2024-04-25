import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import loginService from '../../../src/services/loginService';

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
  it('Should return a valid token when login is successful', async function () {
    const userData = {
      username: 'testUser',
      password: 'password123',
    };
  
    const token = 'valid_token';
  
    sinon.stub(UserModel, 'findOne').resolves({
      id: 1,
      username: userData.username,
      vocation: 'Guerreiro',
      level: 10,
      password: await bcrypt.hash(userData.password, 10),
      productIds: [{ id: 1 }, { id: 2 }],
    } as any);
  
    sinon.stub(loginService, 'login').resolves(token);
  
    const res = await chai.request(app).post('/login').send(userData);
  
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    expect(res.body.token).to.equal(token);
  });
});