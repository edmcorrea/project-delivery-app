import NavBar from '../components/navbar';
import UserForm from '../components/user.form';
import UserList from '../components/user.list';
import '../styles/adm.styles.css';

function AdminManage() {
  return (
    <div>
      <NavBar />
      <div className="adm-page">
        <section className="adm-subpage">
          <UserForm />
        </section>
        <UserList />
      </div>
    </div>
  );
}

export default AdminManage;
