import {Route, BrowserRouter, Routes} from 'react-router';
import Layout from '../views/Layout';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Upload from '../views/Upload';
import Single from '../views/Single';
import Login from '../views/Login';
import Logout from '../views/Logout';
import {UserProvider} from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* USERPROVIDER CAN BE ALSO ABOVE BROWSERROUTER..???? (should work, test yourself t.ile) */}
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />
            <Route path="/single" element={<Single />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
