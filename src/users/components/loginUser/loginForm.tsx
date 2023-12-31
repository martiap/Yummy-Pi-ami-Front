import { SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginData } from '../../../model/user';
import { useUsers } from '../../hooks/use.users';
import styles from '../loginUser/loginForm.module.scss';
export default function LoginForm() {
  const { login } = useUsers();
  const navigate = useNavigate();

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const loginForm = ev.target as HTMLFormElement;

    const data: LoginData = {
      userName: (loginForm.elements.namedItem('userName') as HTMLInputElement)
        .value,
      password: (loginForm.elements.namedItem('password') as HTMLInputElement)
        .value,
    };
    login(data);
    navigate('/recetas');
  };
  return (
    <main className={styles.main}>
      <form aria-label="login" onSubmit={handleSubmit}>
        <legend>LOGIN</legend>
        <input type="text" name="userName" placeholder="Nombre" required />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
        />
        <button type="submit">Login</button>
      </form>
      <Link to={'/registrate'}>SI AÚN NO ESTÁS REGISTRADO, PULSA AQUÍ</Link>
    </main>
  );
}
