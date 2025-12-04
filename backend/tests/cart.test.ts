import { addItem } from '../src/controllers/cart';
import { prisma } from '../src/prisma';
import httpMocks from 'node-mocks-http';

jest.mock('../src/prisma', () => ({
  prisma: {
    product: { findUnique: jest.fn() },
    cart: { findUnique: jest.fn(), create: jest.fn() },
    cartItem: { findFirst: jest.fn(), create: jest.fn(), update: jest.fn() }
  }
}));

const mockedPrisma: any = prisma as any;

describe('Cart controller - addItem', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns 404 when product not found', async () => {
    mockedPrisma.product.findUnique.mockResolvedValue(null);

    const req: any = httpMocks.createRequest({
      method: 'POST',
      body: { productId: 'p1', quantity: 1 },
      user: { id: 'u1' }
    });
    const res: any = httpMocks.createResponse();

    await addItem(req, res);

    expect(res.statusCode).toBe(404);
    const data = res._getJSONData();
    expect(data.error).toBe('Product not found');
  });

  it('returns 400 when insufficient inventory', async () => {
    mockedPrisma.product.findUnique.mockResolvedValue({ id: 'p1', price: 10, inventory: { quantity: 0 } });

    const req: any = httpMocks.createRequest({
      method: 'POST',
      body: { productId: 'p1', quantity: 2 },
      user: { id: 'u1' }
    });
    const res: any = httpMocks.createResponse();

    await addItem(req, res);

    expect(res.statusCode).toBe(400);
    const data = res._getJSONData();
    expect(data.error).toBe('Insufficient inventory');
  });

  it('creates a cart item when enough stock', async () => {
    mockedPrisma.product.findUnique.mockResolvedValue({ id: 'p1', price: 10, inventory: { quantity: 5 } });
    mockedPrisma.cart.findUnique.mockResolvedValue(null);
    mockedPrisma.cart.create.mockResolvedValue({ id: 'c1', userId: 'u1', items: [] });
    mockedPrisma.cartItem.findFirst.mockResolvedValue(null);
    mockedPrisma.cartItem.create.mockResolvedValue({ id: 'ci1', cartId: 'c1', productId: 'p1', quantity: 2, unitPrice: 10 });

    const req: any = httpMocks.createRequest({
      method: 'POST',
      body: { productId: 'p1', quantity: 2 },
      user: { id: 'u1' }
    });
    const res: any = httpMocks.createResponse();

    await addItem(req, res);

    expect(res.statusCode).toBe(201);
    const data = res._getJSONData();
    expect(data.id).toBe('ci1');
    expect(data.quantity).toBe(2);
  });
});
