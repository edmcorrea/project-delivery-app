const pendenteSaleMock = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: 520.45,
  deliveryAddress: 'Rua paralelepipedo, bairro - ES',
  deliveryNumber: '148',
  saleDate: '2023-01-26T18:30:12.000Z',
  status: 'Pendente',
};

const saleProductMock = [
  { saleId: 1, productId: 5, quantity: 6 },
  { saleId: 1, productId: 10, quantity: 12 },
];

const salesFromCustomer = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: 520.45,
    deliveryAddress: 'Rua paralelepipedo, bairro - ES',
    deliveryNumber: '148',
    saleDate: '2023-01-26T18:30:12.000Z',
    status: 'Pendente',
  },
  {
    id: 2,
    userId: 3,
    sellerId: 2,
    totalPrice: 126.82,
    deliveryAddress: 'Rua paralelepipedo, bairro - ES',
    deliveryNumber: '148',
    saleDate: '2023-01-26T19:23:04.000Z',
    status: 'Pendente'
  },
];

module.exports = {
  pendenteSaleMock,
  saleProductMock,
  salesFromCustomer,
};
