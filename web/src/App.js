import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Guides from './screens/guides/Guides';
import GuideAlone from './screens/guides/GuideAlone';
import GuideAdmission from './screens/guides/GuideAdmission';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/login';
import UserForm from './screens/users/UsersForm';
import AuthStore from './components/contexts/AuthStore';
import Tours from './screens/tours/Tours';
import 'semantic-ui-css/semantic.min.css'
//import PrivateRoute from './guards/PrivateRoute';
import Error from './screens/Error';
import TourAlone from './screens/tours/TourAlone';
import Home from './components/home/HomeGuides';
import Xat from './components/xat/Xat';
import UsersProfile from './screens/users/UsersProfile';
import AuthCallback from './screens/users/AuthCallback';
import MessagesView from './screens/messages/MessagesView';






function App() {
  return (


    <Router>
      <AuthStore >
      <Xat />
      
        <Navbar />
    
        <Switch>

          <Route exact path="/home" component={Home} />

          <Route exact path="/users/:id" component={UsersProfile} />

          <Route exact path="/guides" component={Guides} />
          <Route exact path="/guides/:id" component={GuideAlone} />
          <Route exact path="/form-guide" component={GuideAdmission} />

          <Route exact path="/tours" component={Tours} />
          <Route exact path="/tours/:id" component={TourAlone} />

          <Route exact path="/messages" component={MessagesView} />
          
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={UserForm} />
          <Route exact path="/authenticate/google/ghunter" component={AuthCallback}/>


          <Route exact path="/404" component={() => <Error code={404} />} />
          <Route exact path="/403" component={() => <Error code={403} />} />


          <Redirect to="/home" />

        </Switch>
  
      </AuthStore>
    </Router>

  );
}

export default App;
