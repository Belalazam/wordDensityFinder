import React , {useState} from 'react';
import { createRoot } from 'react-dom/client';

// Import Login and Dashboard components
import Login from './loginPage';
import Dashboard from './app';
import SignUpPage from './signupPage';
import ForgetPassword from './forgetPasswordPage';
import NewPassword from './newPassword';



const rootElement = document.getElementById('react-target');

function Routing() {
  const [auth,setAuth] = useState(false);
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return (
      <>
        {auth ? <Dashboard /> : <NewPassword/>}
      </>
  );
}
createRoot(rootElement).render(<Routing />);
export default Routing;
