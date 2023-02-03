import { useContext, useEffect } from 'react';
import Context from '../Context/Context';
import { requestRemoveUser, requestUsers } from '../services/request.mangeUser';

function UserList() {
  const { userList, setUserList } = useContext(Context);

  const getUserList = async () => {
    try {
      const users = await requestUsers('/user');
      setUserList(users);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await requestRemoveUser(`/user/${id}`);
      const users = await requestUsers('/user');
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
    <div>
      { userList.map((user, i) => (
        <div key={ i + 1 }>
          <p data-testid={ `admin_manage__element-user-table-item-number-${i + 1}` }>
            { i + 1 }
          </p>
          <p data-testid={ `admin_manage__element-user-table-name-${i + 1}` }>
            { user.name }
          </p>
          <p data-testid={ `admin_manage__element-user-table-email-${i + 1}` }>
            { user.email }
          </p>
          <p data-testid={ `admin_manage__element-user-table-role-${i + 1}` }>
            { user.role }
          </p>
          <button
            type="button"
            data-testid={ `admin_manage__element-user-table-remove-${i + 1}` }
            onClick={ () => deleteUser(user.id) }
          >
            Excluir
          </button>
        </div>
      )) }
    </div>
  );
}

export default UserList;
