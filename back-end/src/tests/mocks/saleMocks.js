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

const rawSaleMock = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: 520.45,
  deliveryAddress: 'Rua paralelepipedo, bairro - ES',
  deliveryNumber: '148',
  saleDate: '2023-01-26T18:30:12.000Z',
  status: 'Pendente',
  products: [ 
    {
      id: 5,
      name: 'Skol 269ml',
      price: 2.19,
      SaleProduct: { saleId: 1, productId: 5, quantity: 6 },
    },
    {
      id: 10,
      name: 'Skol Beats Senses 269ml',
      price: 3.57,
      SaleProduct: { saleId: 1, productId: 10, quantity: 12 },
    },
  ],
};

const formatedSaleMock = {
  id: 1,
  sellerName: 'Fulana Pereira',
  totalPrice: 520.45,
  saleDate: '2023-01-26T18:30:12.000Z',
  status: 'Pendente',
  products: [
    {
      id: 5,
      name: 'Skol 269ml',
      price: 2.19,
      quantity: 6,
    },
    {
      id: 10,
      name: 'Skol Beats Senses 269ml',
      price: 3.57,
      quantity: 12,
    },
  ],
};

module.exports = {
  pendenteSaleMock,
  saleProductMock,
  salesFromCustomer,
  rawSaleMock,
  formatedSaleMock,
};
