import React from 'react'
import { useState } from 'react';
import { useHistory, useParams } from 'react-router'
import { update } from "../../services/users.service";


import {
  Grid,
  Button,
  Dimmer,
  Loader,
  Segment,
  Image,
  Icon
} from "semantic-ui-react"



const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;

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
    } else if (!EMAIL_PATTERN.test(value)) {
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

function UserToEdit({ ...editUser }) {

  const params = useParams()
  const history = useHistory()


  const [state, setState] = useState({
    user: {
      userName: editUser?.location?.state?.user.userName,
      password: '',
      password2: '',
      email: editUser?.location?.state?.user.email,
      avatar: editUser?.location?.state?.user.avatar,
      phoneNumber: editUser?.location?.state?.user.phoneNumber,
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
      ...state,
      touch: {
        ...state.touch,
        [name]: true
      }

    }
    ))
  }



  const handleChange = (event, result) => {
    let { name, value } = result || event.target;

    if (event.target.files) {

      value = event.target.files[0]

    }
    setState((state) => ({

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
    if (password !== password2) {

      const message = "Password does not match";
      const errors = "Password does not match";
      console.error(errors);
      setState(state => ({
        ...state,
        errors: {
          ...errors,
          title: !errors && message
        }
      }))

      return errors.password2 = "Password does not match"

    }


    if (isValid()) {

      try {
        const userData = { ...state.user };
        const { id } = params;

        const user = await update(userData, id);
        history.push(`/users/${user.id}`);
      }
      catch (error) {
        const { message, errors } = error.response?.data || error;

        setState(state => ({
          ...state,
          errors: {
            ...errors,
            title: !errors && message
          },
          touch: {
            ...errors,
            title: !errors && message
          }
        }))
      }
    }

  }

  const { user, errors, touch } = state;


  return (

    <Grid className="px-3 justify-content-md-center">

      <Grid.Column width={7} md="8" lg="6" xl="5" className=" border rounded d-flex align-items-center">
        <div className="w-100    ">
          <div className="mb-4 m-3">


            <Segment>
              <Dimmer active >
                <Loader></Loader>
              </Dimmer>

              <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

            </Segment>

            <h2 className="text-center">Update your contact details</h2>
            <p className="text-muted text-center">
              We recommend you to introduce your phone number...in a few weeks you could contact us using Telegram
              </p>
          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-group mb-2">
              <input className={`form-control ${(touch.userName && errors.userName) ? 'is-invalid' : ''}`}
                type="text"
                name="userName"
                placeholder={user.userName}
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

            <div className="form-group mb-2">
              <label className="form-label mt-3">We recommend you add your phone number</label>
              <input className={`form-control ${(touch.phoneNumber && errors.phoneNumber) ? 'is-invalid' : ''}`}
                type="number"
                name="phoneNumber"
                placeholder="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <div className="invalid-feedback">{errors.phoneNumber}</div>
            </div>


            <div className="form-group mb-2">
              <label className="form-label mt-3">Selec a new avatar</label>
              <input className={`form-control ${(touch.avatar && errors.avatar) ? 'is-invalid' : ''}`}
                type="file"
                name="avatar"

                placeholder="If you want to chnage it select here you avatar"

                onChange={handleChange}

                onBlur={handleBlur}

              />

              <div className="invalid-feedback">{errors.avatar}</div>
            </div>

            <hr data-content="OR" className="my-3 hr-text letter-spacing-2" />


            <Button
              color="black"
              size="big"
              icon
              floated="right"   >

              <Icon
                size="big"
                centered name='save' />
            </Button>


          </form>

        </div>

      </Grid.Column>

    </Grid>

  )

}
export default UserToEdit

