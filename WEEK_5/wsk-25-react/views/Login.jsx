// imports
import LoginForm from '../src/components/LoginForm';
import RegisterForm from '../src/components/RegisterForm';
import {useState} from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      {isLogin ? <LoginForm /> : <RegisterForm />}

      <button onClick={handleToggle}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </>
  );
};

export default Login;
