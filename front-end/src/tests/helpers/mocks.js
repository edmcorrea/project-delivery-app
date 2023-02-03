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
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  role: 'seller',
  token: 'toquenlwlhhsdjkwhckwjhdjwhd',
};

export const userListMock = [
  {
    id: 2,
    name: 'Fulana Pereira',
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
    name: 'Skol Lata 250ml',
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

export const cartMock = [
  {
    id: 2,
    quantity: 4,
  },
  {
    id: 4,
    quantity: 1,
  },
  {
    id: 6,
    quantity: 2,
  },
];

export const checkoutProductsMock = [
  {
    id: 2,
    name: 'Heineken 600ml',
    quantity: 4,
    price: '7,50',
  },
  {
    id: 4,
    name: 'Brahma 600ml',
    quantity: 1,
    price: '7,50',
  },
  {
    id: 6,
    name: 'Skol Beats Senses 313ml',
    quantity: 2,
    price: '4,49',
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
    status: 'Pendente',
  },
];

export const submitCheckout = {
  sellerId: 2,
  totalPrice: '46,48',
  deliveryAddress: 'Some Valid Address',
  deliveryNumber: '1234',
  products: cartMock,
};
