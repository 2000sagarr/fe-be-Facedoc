import './App.css';
import { Route, Switch } from 'react-router';
import SignIn from './page/SignIn/SignIn';
import SignUp from './page/SignUp/SignUp';
import Landing from './page/Landing/Landing.js';
import User from './page/UserProfile/User.js';

import Dashboard from './page/Dashboard.js/Dashboard';


function App() {

  return (
    <div>
      
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/user' component={User} />
        <Route path='/dashboard' component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
