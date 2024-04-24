import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductService from '../../../src/services/productsService';
import ProductModel from '../../../src/database/models/product.model';
import { Product } from '../../../src/types/Product';

chai.use(chaiHttp);

describe('POST /products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('deve criar um novo produto', async function () {
    const productInput = {
      name: 'Martelo de Thor',
      price: '30 peças de ouro',
      userId: 1,
    };

    const productOutput: Product = {
      id: 1,
      ...productInput,
    };

    const createProductStub = sinon.stub(ProductService, 'createProduct').resolves(productOutput as Product);

    const response = await chai.request(app).post('/products').send(productInput);

    expect(response.status).to.equal(201);
    expect(response.body).to.eql(productOutput);
    expect(createProductStub).to.have.been.calledOnce;

    createProductStub.restore();
  });
});