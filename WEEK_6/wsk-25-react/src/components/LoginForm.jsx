// LoginForm.jsxx
import useForm from '../hooks/formHooks';
import {useUserContext} from '../hooks/contextHooks';
import TextInput from './UI/TextInput';

const LoginForm = () => {
  const {handleLogin} = useUserContext();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      await handleLogin(inputs);
    } catch (e) {
      alert(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  console.log(inputs);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="username"
          name="username"
          type="text"
          id="loginuser"
          onChange={handleInputChange}
          autoComplete="username"
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
          id="loginpassword"
          onChange={handleInputChange}
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
