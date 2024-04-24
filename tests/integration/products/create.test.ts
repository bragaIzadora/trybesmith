import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductService from '../../../src/services/productsService';
import ProductModel from '../../../src/database/models/product.model';
import { Product, ProductInput } from '../../../src/types/Product';

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
});