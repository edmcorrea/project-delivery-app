const pendenteSaleMock = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: 520.45,
  deliveryAddress: 'Rua paralelepipedo, bairro - ES',
  deliveryNumber: '148',
  saleDate: '2023-01-25',
  status: 'Pendente',
};

const saleProductMock = [
  { saleId: 1, productId: 5, quantity: 6 },
  { saleId: 1, productId: 10, quantity: 12 },
];

module.exports = {
  pendenteSaleMock,
  saleProductMock,
};
