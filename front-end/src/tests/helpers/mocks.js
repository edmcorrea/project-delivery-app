const fulanaPereira = 'Fulana Pereira';
const saleDate = '2023-01-26T18:30:12.000Z';
const saleDate2 = '2023-01-06T18:30:12.000Z';
const skolLata = 'Skol Lata 250ml';
const emTransito = 'Em Trânsito';

export const customerMock = {
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  role: 'customer',
  token: 'toquenlwlhhsdjkwhckwjhdjwhd',
};

export const newCustomerMock = {
  name: 'Juazeirinho do norte',
  email: 'juajua@email.com',
  role: 'customer',
  token: 'toquenlwlhhsdjkwhckwjhdjwhd',
};

export const adminMock = {
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  role: 'administrator',
  token: 'toquenlwlhhsdjkwhckwjhdjwhd',
};

export const sellerMock = {
  name: fulanaPereira,
  email: 'fulana@deliveryapp.com',
  role: 'seller',
  token: 'toquenlwlhhsdjkwhckwjhdjwhd',
};

export const userListMock = [
  {
    id: 2,
    name: fulanaPereira,
    email: 'fulana@deliveryapp.com',
    role: 'seller',
  },
  {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    role: 'customer',
  },
];

export const productsMock = [
  {
    id: 1,
    name: skolLata,
    price: 2.20,
    url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: 7.50,
    url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
    price: 2.49,
    url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
  },
];

export const salesMock = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: 520.45,
    deliveryAddress: 'Rua paralelepipedo, bairro - ES',
    deliveryNumber: '148',
    saleDate,
    status: 'Pendente',
  },
  {
    id: 2,
    userId: 3,
    sellerId: 2,
    totalPrice: 126.82,
    deliveryAddress: 'Rua paralelepipedo, bairro - ES',
    deliveryNumber: '148',
    saleDate: saleDate2,
    status: emTransito,
  },
];

export const cartMock = [
  {
    id: 1,
    quantity: 3,
  },
];

export const submitCheckout = {
  sellerId: 2,
  totalPrice: 6.60,
  deliveryAddress: 'Some Valid Address',
  deliveryNumber: '1234',
  products: cartMock,
};

export const saleMock = {
  id: 1,
  sellerName: fulanaPereira,
  totalPrice: 6.60,
  saleDate,
  status: 'Pendente',
  products: [{
    id: 1,
    name: skolLata,
    price: 2.20,
    quantity: 3,
  }],
};

export const saleMockPendente = {
  id: 1,
  sellerName: fulanaPereira,
  totalPrice: 520.45,
  saleDate,
  status: 'Pendente',
  products: [{
    id: 1,
    name: skolLata,
    price: 2.20,
    quantity: 3,
  }],
};

export const saleMockPreparando = {
  id: 1,
  sellerName: fulanaPereira,
  totalPrice: 520.45,
  saleDate,
  status: 'Preparando',
  products: [{
    id: 1,
    name: skolLata,
    price: 2.20,
    quantity: 3,
  }],
};

export const saleMockEmTransito = {
  id: 1,
  sellerName: fulanaPereira,
  totalPrice: 520.45,
  saleDate,
  status: emTransito,
  products: [{
    id: 1,
    name: skolLata,
    price: 2.20,
    quantity: 3,
  }],
};

export const saleMockEmTransito2 = {
  id: 2,
  sellerName: fulanaPereira,
  totalPrice: 126.82,
  saleDate: saleDate2,
  status: emTransito,
  products: [{
    id: 1,
    name: skolLata,
    price: 2.20,
    quantity: 3,
  }],
};

export const saleMockEntregue2 = {
  id: 2,
  sellerName: fulanaPereira,
  totalPrice: 126.82,
  saleDate: saleDate2,
  status: 'Entregue',
  products: [{
    id: 1,
    name: skolLata,
    price: 2.20,
    quantity: 3,
  }],
};

export const preparandoMock = {
  id: 1,
  status: 'Preparando',
};

export const emTransitoMock = {
  id: 1,
  status: emTransito,
};

export const entregueMock = {
  id: 1,
  status: 'Entregue',
};
