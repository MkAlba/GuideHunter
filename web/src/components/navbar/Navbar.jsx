import { NavLink, useHistory } from 'react-router-dom';
import logo from '../../images/3erlogo.jpg';
import { Button } from 'reactstrap'
import Login from '../login/login'
import React from 'react'
import { logout } from '../../services/users.service'
import { useContext } from 'react'
import { AuthContext } from './../contexts/AuthStore';



function Navbar() {

  const history = useHistory()

  const { user, isAuthenticated, onUserChange } = useContext(AuthContext)
  const [modalShow, setModalShow] = React.useState(false);


  async function handleLogout() {
    await logout()
    onUserChange(undefined);
    history.push('/home')
  }

  return (

    <nav className="navbar top-fix  navbar-expand-lg navbar-light " id="mainNav">
      <div className="container" >
      <div>
        <img src={logo} alt="Company" width="110" className="d-inline-block align-middle me-4" />

        <button className="navbar-toggler  text-black" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand js-scroll-trigger" href="/home">Guides Hunter</a>

        </div>   
        <div className="collapse navbar-collapse" className="inline-block align-middle "id="navbarTogglerDemo01">

          <ul className="navbar-nav ml-auto">
            <li className="nav-item me-2"><NavLink className="nav-link " activeClassName="active" to="/guides">Guides</NavLink></li>
            <li className="nav-item me-5"><NavLink className="nav-link" activeClassName="active" to="/tours">Tours</NavLink></li>


            {isAuthenticated() && (

              <div className="d-grid gap-2 d-md-flex  " >
                <div ><img className="rounded-circle" style={{ width: 45 }} src={user.avatar} alt="Guide" /></div>
                <li className="nav-item "><NavLink className="nav-link " to={`/users/:id`}>{user.email}</NavLink></li>
                <li className="nav-item  " className="btn btn-light" onClick={handleLogout}>Logout</li>
              </div>

            )}

            {!isAuthenticated() && (

              <>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/register">Register</NavLink></li>
                <Button type="submit" color="outline-primary" block className="btn-social mb-3"
                  onClick={() => {
                    setModalShow(true);
                  }}>
                  <span className="d-none d-sm-inline">Login </span></Button>



                <Login
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />


              </>
            )}
          </ul>









        </div>
      </div>
    </nav >




  );
}

export default Navbar;
