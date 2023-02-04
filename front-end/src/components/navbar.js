import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context/Context";
import "../styles/navbar.css";
import duckLogin from "../images/duck-logo-2.png";

function NavBar() {
  const [name, setName] = useState("");
  const history = useNavigate();
  const [userRole, setUserRole] = useState("");
  const { setItems } = useContext(Context);

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUserRole("");
    setItems([]);
    history("/login");
  };

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem("user"));
    if (userObj) {
      setName(userObj.name);
      setUserRole(userObj.role);
    }
  }, []);

  return (
    <div className="navbar-component">
      <section>
        <img
          className="img-logo"
          alt="duck-duck-login"
          src={duckLogin}
          style={{ width: "110px", height: "70px" }}
        />
        <div className="white-border"> </div>
        {userRole === "customer" && (
          <button
            data-testid="customer_products__element-navbar-link-products"
            type="button"
            onClick={() => history("/customer/products")}
          >
            PRODUTOS
          </button>
        )}
        {userRole !== "administrator" && (
          <button
            data-testid="customer_products__element-navbar-link-orders"
            type="button"
            onClick={() => history(`/${userRole}/orders`)}
          >
            MEUS PEDIDOS
          </button>
        )}
        {userRole === "administrator" && (
          <button
            data-testid="customer_products__element-navbar-link-orders"
            type="button"
            onClick={() => history("/admin/manage")}
          >
            GERENCIAR USUÁRIOS
          </button>
        )}
      </section>
      <section>
        <h2 data-testid="customer_products__element-navbar-user-full-name">
          {name}
        </h2>
        <button
          className="navbar-logout"
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={logoutUser}
        >
          LOGOUT
        </button>
      </section>
    </div>
  );
}

export default NavBar;
