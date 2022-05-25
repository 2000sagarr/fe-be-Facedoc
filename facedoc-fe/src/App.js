import './App.css';
import { Route, Switch } from 'react-router';
import SignIn from './page/SignIn/SignIn';
import SignUp from './page/SignUp/SignUp';
import Landing from './page/Landing/Landing.js';
import User from './page/UserProfile/User.js';
import Upload from './page/Upload/Upload';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './page/Dashboard/Dashboard';
import Navbar from './components/Navbar';
import err404 from './page/Error/Error';
import err500 from './page/Error/ServerError';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/user' component={User} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/server-error' component={err500} />
        <Route path='/add-info' component={Upload} />
        <Route path='*' component={err404} />
      </Switch>
    </div>
  );
}

export default App;
