import React from 'react'
import { useState, useContext} from 'react';
import { useHistory } from 'react-router';
import guidesService from '../../../services/guides-service';
import {
  Input,
  FormText,
  
} from 'reactstrap';
import { AuthContext } from './../../contexts/AuthStore';
import { Dropdown, Container, Divider, Button } from "semantic-ui-react";

import Acceptation from './Acceptation';



const constants = require('../../../constantsWeb')



const validations = {

  name: (value) => {
    let message;
    if (!value) {
      message = 'Name is required';
    } else if (value && value.length < 5) {
      message = 'Name needs at least 5 characters'
    }
    return message;
  },

  surname: (value) => {
    let message;
    if (!value) {
      message = 'Surname is required';
    } else if (value && value.length < 5) {
      message = 'Surname needs at least 5 characters'
    }
    return message;
  },

  guideLicense: (value) => {
    let message;
    if (!value) {
      message = 'Guide License is required';
    }
    return message;
  },


  email: (value) => {
    let message;
    if (!value) {
      message = 'Email is required';
    }
    return message;
  },


  experience: (value) => {
    let message;
    if (!value) {
      message = 'Experience is required';
    } else if (value && value.length < 20) {
      message = 'Experience needs at least 20 characters'
    }
    return message;
  },

  avatar: (value) => {
    let message;
    if (!value) {
      message = 'Image is required';
    }
    return message;
  }

}


function GuideForm({ guide: guideToEdit = {}, languages }) {


  const history = useHistory();
  const { user, isAuthenticated } = useContext(AuthContext)

  const [modalShow, setModalShow] = React.useState(false);

  const [state, setState] = useState({

    guide: {
      name: '',
      surname: '',
      guideLicense: '',
      email: '',
      phoneNumber: '',
      experience: '',
      avatar: '',
      languages: [],
      ...guideToEdit
    },

    errors: {
      name: validations.name(guideToEdit.name),
      surname: validations.surname(guideToEdit.surname),
      guideLicense: validations.guideLicense(guideToEdit.guideLicense),
      email: validations.email(guideToEdit.email),
      experience: validations.experience(guideToEdit.experience),
      avatar: validations.avatar(guideToEdit.avatar),
    },

    touch: {},

  });



  const handleChange = (event, result) => {
    let { name, value } = result || event.target;

    if (event.target.files) {

      value = event.target.files[0]
    }

    setState(state => {
      return {
        ...state,
        guide: {
          ...state.guide,
          [name]: value,
        },
        errors: {
          ...state.errors,
          [name]: validations[name] && validations[name](value),
        }
      }
    })
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isValid()) {  //si no hay errores entonces creamos al guía
     
      try {
        const guideData = {...state.guide};
        
        guideData.languages = guideData.languages.map(language => language.trim()) || [];
        
        const guide = guideData.id ? await guidesService.update(guideData) : await guidesService.create(guideData);
        history.push(`/guides/${guide.id}`);


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
        }));
      }
    }
  }


  /* guidesService.create(this.state.guide)
     .then(guide => this.setState(guide))
     .catch(error => {
       const { message, errors } = error.response?.data || { message: error.message };
       this.setState({
         errors: {
           ...errors,
           title: !errors && message
         },
         touch: {
           ...errors,
           title: !errors && message
         }
       })
     })
 }
}*/





  const handleBlur = (event) => {  //esta hace que si tocamos en el formulario ya nos deje como inválido si no se completa el campo
    const { name } = event.target;
    setState((state) => ({
      ...state,
      touch: {
        ...state.touch,
        [name]: true
      }
    }));
  }






  const isValid = () => {  //funcion que comprueba que no hay errores
    const { errors } = state;
   
    return !Object.keys(errors).some(error => errors[error]);
  }



  const { guide, errors, touch } = state;


  return (
    <Container>
      
      <div className="container mt-5 ms-4 me-4">
      { user?.role === 'user' && 
        <div className="row">
          <div class="col">
            <h5 className="fw-bolder" >How it works?</h5>
            <p>Fill this form and we will check that your Guide License is valid.</p>
            <p>Before 24 hours, you will receive and email confirming your request and...</p>
          </div>
          <div className="col">
            <h5 className="fw-bolder" >Why GuideHunter?</h5>
            <p>Hundreds of Travel Agencies and Hotels will contact you!!!</p>
            <p>Finally you could have direct contact with customers </p>
          </div>

        </div> }
      </div>
      <Divider horizontal>Guide Details</Divider>
      <div className="container mt-4 ms-4 me-4" >
        <form onSubmit={handleSubmit} >
          <div className="row g-2 mt-2 mb-3">
            <div className="col-md">
              <div className="form-floating">
                <input className={`form-control ${(touch.name && errors.name) ? 'is-invalid' : ''}`} id="floatingName"
                  type="text"
                  name="name"
                  value={guide.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="floatingName">Name</label>
                <div className="invalid-feedback">{errors.name}</div>
              </div>
            </div>

            <div className="col-md">
              <div className="form-floating">
                <input className={`form-control ${(touch.surname && errors.surname) ? 'is-invalid' : ''}`} id="floatingSurname"
                  type="text"
                  name="surname"
                  value={guide.surname}
                  onChange={handleChange}
                  onBlur={handleBlur} />
                <label htmlFor="floatingSurname">Surname</label>
                <div className="invalid-feedback">{errors.surname}</div>
              </div>
            </div>

            <div className="col-md">
              <div className="form-floating">
                <input className={`form-control ${(touch.guideLicense && errors.guideLicense) ? 'is-invalid' : ''}`} id="floatingGuideLicense"
                  type="text"
                  name="guideLicense"
                  value={guide.guideLicense}
                  onChange={handleChange}
                  onBlur={handleBlur} />
                <label htmlFor="floatingGuideLicense">Official Guide License</label>
                <div className="invalid-feedback">{errors.guideLicense}</div>
              </div>
            </div>




            <div className="col-md">
              <div className="form-floating">
                <input className={`form-control ${(touch.email && errors.email) ? 'is-invalid' : ''}`} id="floatingEmail"
                  type="mail"
                  name="email"
                  value={guide.email}
                  onChange={handleChange}
                  onBlur={handleBlur} />
                <label htmlFor="floatingEmail">Email</label>
                <div className="invalid-feedback">{errors.email}</div>
              </div>
            </div>

            <div className="col-md">
              <div className="form-floating">
                <input className={`form-control ${(touch.phoneNumber && errors.phoneNumber) ? 'is-invalid' : ''}`} id="floatingPhoneNumber"
                  type="text"
                  name="phoneNumber"
                  value={guide.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur} />
                <label htmlFor="floatingPhoneNumber">Optional Phone Number</label>
                <div className="invalid-feedback">{errors.phoneNumber}</div>
              </div>
            </div>
          </div>

          


          <div className="row" >            
              <div className="col" className="mt-2 mb-2">
                <FormText color="muted" >
                Avatar is first impression that travellers watch...pay attention at this picture!!!
                </FormText>
                <p></p>
                <Input className={`form-control ${(touch.avatar && errors.avatar) ? 'is-invalid' : ''}`} id="floatingavatar"
                type="file"
                name="avatar"
                lang="en"
                onChange={handleChange}
                onBlur={handleBlur} />
                <div className="invalid-feedback">{errors.avatar}</div>
              </div>

              <div className="col" className="mt-3 mb-2">
                <Dropdown
                  clearable
                  fluid
                  multiple
                  search
                  selection
                  name="languages"
                  options={constants.COUNTRY_OPTIONS}
                  placeholder='Select Languages'
                  onChange={handleChange}
                  closeOnChange={true}
                  value={guide.languages}
                />
              </div>

           
          </div>

          <div className="row mt-3 g-2">


            <div className="col-md">
              <div className="form-floating">
                <textarea className={`form-control  ${(touch.experience && errors.experience) ? 'is-invalid' : ''}`} id="floatingexperience"
                  style={{height: 150}}
                  type="text"
                  name="experience"
                  value={guide.experience}
                  onChange={handleChange}
                  onBlur={handleBlur} />
                <label htmlFor="floatingexperience">Who am I?</label>
                <div className="invalid-feedback ">{errors.experience}</div>
              </div>

            </div>

          </div>



         
          {!guide.id &&
                <Button type="submit" color="outline-primary" block className="btn-social mt-3"
                  onClick={() => {
                    setModalShow(true);
                  }}>
                  <span className="d-none d-sm-inline">Connect with customers!! </span></Button>}



                <Acceptation
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                

          {guide.id &&

            <Button outline color="secondary" className="mt-3" >Update Profile</Button>
            }

        </form>

        <div className="mt-5 " style={{ width: "600px" }}>

          <h3>UPLOAD PHOTOS</h3>
          <h4>We recommend to to upload 4 photos at least!! </h4>


        </div>

      </div>
    </Container>

  )


}


export default GuideForm
