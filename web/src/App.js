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
import PrivateRoute from './guards/PrivateRoute';
import Error from './screens/Error';
import TourAlone from './screens/tours/TourAlone';
import Home from './components/home/HomeGuides';
import Xat from './components/xat/Xat';
import UsersProfile from './screens/users/UsersProfile';
import AuthCallback from './screens/users/AuthCallback';
import Conversations from './screens/messages/Conversations';
import GuideToEdit from './screens/guides/GuideToEdit';
//import Footer from './components/footer/Footer';
import '../src/components/footer/Footer.css'
import ConversationModal from './components/messages/ConversationModal';
import UserToEdit from './screens/users/UserToEdit';
import TourForm from './components/tours/TourForm';






function App() {
  return (


    <Router>
      <AuthStore >
      <Xat />
      
        <Navbar />
    
        <Switch>

          <Route exact path="/home" component={Home} />

          <Route exact path="/users/:id" component={UsersProfile} />
          <PrivateRoute exact path="/form-user/:id" component={UserToEdit} />

          <Route exact path="/guides" component={Guides} />
          <Route exact path="/guides/:id" component={GuideAlone} />
          <Route exact path="/form-guide" component={GuideAdmission} />
          <PrivateRoute exact path="/form-guide/:id" component={GuideToEdit} />


          <PrivateRoute exact path="/create-tour" component={TourForm} />
          <Route exact path="/tours" component={Tours} />
          
          <Route exact path="/tours/:id" component={TourAlone} />

          <Route exact path="/messages" component={Conversations} />
          <Route exact path="/messages/:id/read" component={ConversationModal} />

          
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
