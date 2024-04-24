import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductService from '../../../src/services/productsService';

chai.use(chaiHttp);

describe('GET /products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Should list all products', async function () {
    const products = [
      {
        id: 1,
        name: 'Excalibur',
        price: '10 peças de ouro',
        userId: 1,
      },
      {
        id: 2,
        name: 'Espada Justiceira',
        price: '20 peças de ouro',
        userId: 1,
      },
    ];

    sinon.stub(ProductService, 'listProducts').resolves(products as any);

    const res = await chai.request(app).get('/products');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(products);
  });
});