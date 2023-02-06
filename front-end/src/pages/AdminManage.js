import { useContext, useEffect, useState } from "react";
import NavBar from "../components/navbar";
import UserList from "../components/user.list";
import Context from "../Context/Context";
import {
  requestInsertUser,
  requestUsers,
  setToken,
} from "../services/request.mangeUser";
import "../styles/adm.styles.css";

function AdminManage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);
  const { setUserList } = useContext(Context);

  const handleChange = ({ target: { id, value } }) => {
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
    if (id === "name") setName(value);
    if (id === "type-user") setRole(value);
  };

  const clearInputs = () => {
    setEmail("");
    setName("");
    setRole("customer");
    setPassword("");
  };

  const registerNewUser = async () => {
    const { token } = JSON.parse(localStorage.getItem("user"));
    try {
      setToken(token);
      const userData = {
        name,
        email,
        password,
        role,
      };
      await requestInsertUser("/user/admin", userData);
      clearInputs();
      const users = await requestUsers("/user");
      setUserList(users);
    } catch (err) {
      setErrorMessage(err.message);
      setError(true);
    }
  };

  useEffect(() => {
    const passwordMinLength = 6;
    const nameMinLength = 12;
    const regexMail = /\S+@\S+\.\S+/;
    if (
      password.length >= passwordMinLength &&
      regexMail.test(email) &&
      name.length >= nameMinLength
    ) {
      return setDisableBtn(false);
    }
    return setDisableBtn(true);
  }, [email, password, name]);

  return (
    <div>
      <NavBar />
      <div className="adm-page">
        <section className="adm-subpage">
          {error && (
            <p data-testid="admin_manage__element-invalid-register">
              {errorMessage}
            </p>
          )}
          <h2>Cadastrar novo usuário</h2>
          <form>
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                id="name"
                data-testid="admin_manage__input-name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                data-testid="admin_manage__input-email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password">
              Senha:
              <input
                id="password"
                type="password"
                data-testid="admin_manage__input-password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="seller">
              Tipo:
              <select
                name="type-user"
                id="type-user"
                onChange={handleChange}
                data-testid="admin_manage__select-role"
                value={role}
              >
                <option value="seller"> Vendedor</option>
                <option value="customer"> Cliente</option>
                <option value="administrator"> Administrador</option>
              </select>
            </label>
            <button
              type="button"
              disabled={disableBtn}
              data-testid="admin_manage__button-register"
              onClick={registerNewUser}
            >
              Cadastrar
            </button>
          </form>
        </section>
        <UserList />
      </div>
    </div>
  );
}

export default AdminManage;
