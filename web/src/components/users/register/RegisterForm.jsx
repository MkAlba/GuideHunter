import { useState } from "react";
import { useHistory } from "react-router"; //use History te permite modificar y manipular la api de la url me puedo mover desde donde quiera
import { register } from "../../../services/users.service";
import registerLogo from '../../../images/Register.jpeg'
import { Link } from 'react-router-dom';

import {

  Container,
  Row,
  Col,
  Button,  
} from "reactstrap"



const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;
// hacer cosas de uso de la ruta {uselocation} accede a los parametros de 

const validations = {

  userName: (value) => {
    let message;
    if (!value) {
      message = 'UserName is required';
    }
    return message;
  },


  email: (value) => {
    let message;
    if (!value) {
      message = 'Email is required';
    }else if (!EMAIL_PATTERN.test(value)) {
      message = 'The EMAIL is invalid'
    }

    return message;
  },

  password: (value) => {
    let message;
    if (!value) {
      message = 'Password is required';
    }
    else if (!PASSWORD_PATTERN.test(value)) {
      message = 'The password is invalid'
    }
    else if (value < 8) {
      message = 'Password at least need 8 characters'
    }
    return message;
  },

  password2: (value) => {
    let message;
    if (!value) {
      message = 'Confirmation password is required';
    } 

    return message
  }
}

function RegisterForm() {

  const history = useHistory()

  const [state, setState] = useState({
    user: {
      userName: '',
      password: '',
      password2: '',
      email: '',
      //    avatar: ''
    },

    errors: {
      userName: validations.userName(),
      email: validations.email(),
      password: validations.password(),
      password2: validations.password2(),
    },

    touch: {}
  })

  const isValid = () => {
    const { errors } = state;
    

    return !Object.keys(errors).some(error => errors[error]);
  
  }

  const handleBlur = (event) => {
    const { name } = event.target;
    setState(state => ({
      ...state, //esto es porque en un hooks tengo que devovlerle el objeto stado enetero

      touch: {
        ...state.touch,
        [name]: true
      }

    }
    ))
  }
  //  const [isCreated, setIsCreated] = useState(false);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((state) => ({
      //esto es porque en un hooks tengo que devovlerle el objeto stado enetero
      ...state,
      user: {
        ...state.user,
        [name]: value
      },
      errors: {
        ...state.errors,
        [name]: validations[name] && validations[name](value),
      }
    })
    )
  }

  const handleSubmit = async (event) => {

    event.preventDefault();

    const { password, password2 } = state.user;

    console.log(password)
    console.log(password2)
    if (password !== password2) 
          return  errors.password2 = "Password does not match"

    if (isValid()) {

      try {
        const { user } = state;
        await register(user);
        history.push('/login', { isOpen: true, email: user.email });
      }
      catch (error) {//esos errores son al utilizar el servicio al ir  servidor lo deja axios
        const {  errors } = error && error.response ? error.response.data : error;
        console.error(errors);
        setState(state => ({
          ...state,   //aqui conseguimos que si el error no está en react lo valide el servidor
          errors: errors
        }))
      }
    }

  }

  const { user, errors, touch } = state;


  return (

    <Container fluid className="px-3">
      <Row className="text-center row justify-content-md-center">
        <Col md="8" lg="6" xl="5" className="d-flex align-items-center">
          <div className="w-100 py-5 md-5 px-xl-6 p">
            <div className="mb-4">
              <img
                src={registerLogo}
                alt="..."
                style={{ maxWidth: "30rem" }}
                className="img-fluid mb-3"
              />
              <h2 className="text-center">Register</h2>
              <p className="text-muted text-center">
                His room, a proper human room although a little too small, lay
                peacefully between its four familiar walls. A collection of
                textile samples lay spread out on the table.
              </p>
            </div>
            <form onSubmit={handleSubmit}>

              <div className="form-group mb-2">
                <input className={`form-control ${(touch.userName && errors.userName) ? 'is-invalid' : ''}`}
                  type="text"
                  name="userName"
                  placeholder="UserName"
                  value={user.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <div className="invalid-feedback">{errors.userName}</div>
              </div>



              <div className="form-group mb-2">
                <input className={`form-control ${(touch.email && errors.email) ? 'is-invalid' : ''}`}
                  type="email"
                  name="email"
                  placeholder="email"
                  value={user.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <div className="invalid-feedback">{errors.email}</div>
              </div>




              <div className="form-group mb-2">
                <input className={`form-control ${(touch.password && errors.password) ? 'is-invalid' : ''}`}
                  type="password"
                  name="password"
                  placeholder="password"
                  value={user.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />

                <div className="invalid-feedback">{errors.password}</div>
              </div>


              <div className="form-group mb-2">
                <input className={`form-control ${(touch.password2 && errors.password2) ? 'is-invalid' : ''}`}
                  type="password"
                  name="password2"
                  placeholder="Confirm your password"
                  value={user.password2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />

                <div className="invalid-feedback">{errors.password2}</div>
              </div>


              <button type="submit" className="btn btn-primary btn-block mt-1">Register</button>

            </form>
            <hr data-content="OR" className="my-3 hr-text letter-spacing-2" />

            <Link to={{
              pathname: "/login" ,

            }}>
              <Button color="outline-primary"  block className="btn-social mb-3">
                <span className="d-none d-sm-inline">Already Registered? </span>
              </Button>
            </Link>

            <Button color="outline-muted" block className="btn-social mb-3">
              <i className="fa fa-google " />

              <span className="d-none d-sm-inline"> Login with Google</span>
            </Button>
            <hr className="my-4" />
            <p className="text-sm text-muted">
              By signing up you agree to Directory's{" "}
              <a href="/home">Terms and Conditions</a> and{" "}
              <a href="/home">Privacy Policy</a>.
            </p>

            


          </div>

        </Col>
      </Row>
    </Container>
  )

}
export default RegisterForm
