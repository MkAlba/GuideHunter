import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../components/contexts/AuthStore';

function PrivateRoute({ component: Component, ...routeProps}) {  //primero cambias de minúscula a mayúscula la C y luego las 
    //propiedades me las guardas en routeProps
    
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route {...routeProps} component={(componentProps => {
      if (isAuthenticated()) return <Component {...componentProps}/>
      else return <Redirect to="/login"/>
    }) } />
  )
}

export default PrivateRoute;
