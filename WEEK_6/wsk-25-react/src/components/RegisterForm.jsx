import useForm from '../hooks/formHooks';
import {useUser} from '../hooks/apiHooks';
import {useNavigate} from 'react-router';

const RegisterForm = () => {
  const {postUser} = useUser();
  const nav = useNavigate();

  const initValues = {
    username: '',
    email: '',
    password: '',
  };

  const doRegister = async () => {
    // TODO: add login functionalities here
    await postUser(inputs);

    nav('/');
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  console.log(inputs);

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newusername">Username</label>
          <input
            name="username"
            type="text"
            id="newusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="registeremail">Email</label>
          <input
            name="email"
            type="email"
            id="registeremail"
            onChange={handleInputChange}
            autoComplete="current-email"
          />
        </div>
        <div>
          <label htmlFor="registerpassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Create new user</button>
      </form>
    </>
  );
};

export default RegisterForm;
