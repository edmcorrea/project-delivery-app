function NavBar() {
  return (
    <div>
      <h2
        data-testid="customer_products__element-navbar-link-products"
      >
        PRODUTOS
      </h2>
      <h2 data-testid="customer_products__element-navbar-link-orders">
        MEUS PEDIDOS
      </h2>
      <h2 data-testid="customer_products__element-navbar-user-full-name">
        NOME pessoa usuária
      </h2>
      <h2 data-testid="customer_products__element-navbar-link-logout">
        logout
      </h2>
    </div>
  );
}

export default NavBar;
