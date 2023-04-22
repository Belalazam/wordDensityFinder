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
  const [switcher,setSwitcher] = useState(0);

  if(switcher === 0)
  {
  return (
      <Login onSignup={() => setSwitcher(1)} onForget={()=>setSwitcher(2)}  onSuccess={()=>setSwitcher(4)}/>
  );
  }
  else if(switcher === 1)
  {
    return (
      <SignUpPage onLogin={() => setSwitcher(0)} onForget={()=>setSwitcher(2)}  onSuccess={()=>setSwitcher(0)}/>
    );
  }
  else if(switcher === 2)
  {
    return (
      <ForgetPassword onLogin={() => setSwitcher(0)} onSignup={()=>setSwitcher(1)}  onSuccess={()=>setSwitcher(3)}/>
    );
  }
  else if(switcher === 3)
  {
    return (
      <NewPassword onLogin={() => setSwitcher(0)} onSignup={()=>setSwitcher(1)}  onSuccess={()=>setSwitcher(0)}/>
    );
  }
  else if(switcher === 4)
  {
    return (
      <Dashboard/>
    );
  }
}
createRoot(rootElement).render(<Routing />);
export default Routing;
