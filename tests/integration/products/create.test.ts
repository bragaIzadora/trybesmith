import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductService from '../../../src/services/productsService';
import ProductModel from '../../../src/database/models/product.model';
import { ProductInput } from '../../../src/types/Product';

chai.use(chaiHttp);

describe('POST /products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('deve criar um novo produto', async function () {
    const productInput: ProductInput = {
      name: 'Martelo de Thor',
      price: '30 peças de ouro',
      userId: 1,
    };

    const productOutput = {
      id: 1,
      ...productInput,
      toJSON: () => productInput,
    };

    const createProductStub = sinon.stub(ProductModel, 'create').resolves(productOutput as any);

    const response = await chai.request(app).post('/products').send(productInput);

    expect(response.status).to.equal(201);
    expect(response.body).to.eql(productInput);
    expect(createProductStub).to.have.been.calledOnceWith(productInput);

    createProductStub.restore();
  });

  // it('deve retornar erro se "name" não for informado', async function () {
  //   const productInput = {
  //     price: '30 peças de ouro',
  //     userId: 1,
  //   };

  //   const response = await chai.request(app).post('/products').send(productInput);

  //   expect(response.status).to.equal(400);
  //   expect(response.body).to.eql({ message: '"name" is required' });
  // });

  // it('deve retornar erro se "price" não for informado', async function () {
  //   const productInput = {
  //     name: 'Martelo de Thor',
  //     userId: 1,
  //   };

  //   const response = await chai.request(app).post('/products').send(productInput);

  //   expect(response.status).to.equal(400);
  //   expect(response.body).to.eql({ message: '"price" is required' });
  // });

  // it('deve retornar erro se "userId" não for informado', async function () {
  //   const productInput = {
  //     name: 'Martelo de Thor',
  //     price: '30 peças de ouro',
  //   };

  //   const response = await chai.request(app).post('/products').send(productInput);

  //   expect(response.status).to.equal(400);
  //   expect(response.body).to.eql({ message: '"userId" is required' });
  // });

  // it('deve retornar erro se "name" não for uma string', async function () {
  //   const productInput = {
  //     name: 123,
  //     price: '30 peças de ouro',
  //     userId: 1,
  //   };

  //   const response = await chai.request(app).post('/products').send(productInput);

  //   expect(response.status).to.equal(422);
  //   expect(response.body).to.eql({ message: '"name" must be a string' });
  // });

  // it('deve retornar erro se "price" não for uma string', async function () {
  //   const productInput = {
  //     name: 'Martelo de Thor',
  //     price: 123,
  //     userId: 1,
  //   };

  //   const response = await chai.request(app).post('/products').send(productInput);

  //   expect(response.status).to.equal(422);
  //   expect(response.body).to.eql({ message: '"price" must be a string' });
  // });

  // it('deve retornar erro se "name" tiver menos de 3 caracteres', async function () {
  //   const productInput = {
  //     name: 'a',
  //     price: '30 peças de ouro',
  //     userId: 1,
  //   };

  //   const response = await chai.request(app).post('/products').send(productInput);

  //   expect(response.status).to.equal(422);
  //   expect(response.body).to.eql({ message: '"name" length must be at least 3 characters long' });
  // });

  // it('deve retornar erro se "price" tiver menos de 3 caracteres', async function () {
  //   const productInput = {
  //     name: 'Martelo de Thor',
  //     price: 'aa',
  //     userId: 1,
  //   };

  //   const response = await chai.request(app).post('/products').send(productInput);

  //   expect(response.status).to.equal(422);
  //   expect(response.body).to.eql({ message: '"price" length must be at least 3 characters long' });
  // });
});