import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from "reactstrap";


import { useHistory, useParams } from "react-router"; //location cuando ya he cambiado de página tomar decisiones
import { login } from "../../services/users.service";
import { AuthContext } from '../contexts/AuthStore';






function Login(props) {

  const history = useHistory()
  const params = useParams()
  const { onUserChange } = useContext(AuthContext)

  const [data, setData] = useState({
    email: params.state?.params.state.email || '',
    password: ''
  })

  const [error, setError] = useState(null)

  function handleChange(e) {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const user = await login(data.email, data.password)
      onUserChange(user)
      props.onHide()
      history.replace('/home')

    } catch (error) {
      setError(error?.response?.data?.message)

    }
  }

  const socialLoginUrl = `${process.env.REACT_APP_API_BASE_URL}/authenticate/google`

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login
            </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col-12 col-sm-4 mx-auto">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form className="mt-3 mb-3" onSubmit={handleSubmit}>
            <div className="input-group mb-1">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fa fa-envelope-o" aria-hidden="true"></i></span>
              </div>
              <input type="email" className="form-control" name="email"
                onChange={handleChange} required
                placeholder="user@example.org" value={data.email} />
              <div className="invalid-feedback">{data.err}</div>
            </div>

            <div className="input-group mb-1">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fa fa-lock" aria-hidden="true"></i></span>
              </div>
              <input type="password" className="form-control mb-3" name="password" value={data.password}
                onChange={handleChange}
                placeholder="Password" />
            </div>

            <Button type="submit" color="outline-primary" block className="btn-social mb-3">
              <span className="d-none d-sm-inline">Login </span></Button>
          </form>

          <hr data-content="OR" className="my-3 hr-text letter-spacing-2" />

          <Button href={socialLoginUrl} color="outline-muted" block className="btn-social mb-3">
            <i className="fa fa-google " />

            <span className="d-none d-sm-inline"> Login with Google</span>
          </Button>



        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default Login