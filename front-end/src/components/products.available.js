function ProductsAvailable() {
  const MockProducts = [
    {
      name: "Skol Lata 250ml",
      price: 2.2,
      url_image: "http://localhost:3001/images/skol_lata_350ml.jpg",
    },
    {
      name: "Heineken 600ml",
      price: 7.5,
      url_image: "http://localhost:3001/images/heineken_600ml.jpg",
    },
  ];

  console.log(MockProducts);
  return (
    <div>
      {MockProducts.map((products, i) => (
        <div key={i}>
          <p data-testid={`customer_products__element-card-price-${i}`}>{products.name}</p>
          <p data-testid={`customer_products__img-card-bg-image-${i}`}>{products.price}</p>
          <img data-testid={`customer_products__element-card-title-${i}`} src={products.url_image} />
          <button data-testid={`customer_products__button-card-rm-item-${i}`}>
            -
          </button>
          <p
          data-testid={`customer_products__input-card-quantity-${i}`}
          >Qtdd-Item</p>
          <button
          data-testid={`customer_products__button-card-add-item-${i}`}
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductsAvailable;
