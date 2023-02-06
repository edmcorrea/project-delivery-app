import { useContext, useEffect } from "react";
import Context from "../Context/Context";
import { requestRemoveUser, requestUsers } from "../services/request.mangeUser";
import "../styles/user.list.css";

function UserList() {
  const { userList, setUserList } = useContext(Context);

  const getUserList = async () => {
    try {
      const users = await requestUsers("/user");
      console.log("users inicial", users);
      setUserList(users);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await requestRemoveUser(`/user/${id}`);
      const users = await requestUsers("/user");
      console.log(users);
      setUserList(users);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="list-user-page">
      <h2>Lista de Usuários</h2>
      <table className="listUsers">
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Tipo</th>
          <th>Remover</th>
        </tr>
        {userList.map((user, i) => (
          <tr key={i + 1}>
            <td
              data-testid={`admin_manage__element-user-table-item-number-${
                i + 1
              }`}
            >
              {i + 1}
            </td>
            <td data-testid={`admin_manage__element-user-table-name-${i + 1}`}>
              {user.name}
            </td>
            <td data-testid={`admin_manage__element-user-table-email-${i + 1}`}>
              {user.email}
            </td>
            <td data-testid={`admin_manage__element-user-table-role-${i + 1}`}>
              {user.role}
            </td>
            <td>
              <button
                className="user-list-btn"
                type="button"
                data-testid={`admin_manage__element-user-table-remove-${i + 1}`}
                onClick={() => deleteUser(user.id)}
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default UserList;
