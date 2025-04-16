// ProtectedRoute.jsx
import {Navigate, useLocation} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';

const ProtectedRoute = ({children}) => {
  const {user} = useUserContext();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{from: location}} />;
  }

  return children;
};

export default ProtectedRoute;
