import { React, useEffect, useState, useContext } from 'react';
import guidesService from '../../../services/guides-service';

import { Link, useHistory, useParams } from 'react-router-dom';
import { AuthContext } from './../../contexts/AuthStore';
import { MessageForm } from './../../messages/MessageForm';


const constants = require('../../../constantsWeb')




function GuideDetail() {

  const history = useHistory()
 const params = useParams() 
  const [guide, setGuide] = useState()
  const {  isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    //component didmount
    async function fetchGuide() {

      try {
        const { id } = params;
        const guide = await guidesService.detail(id);

        if (!isUnmounted) {

          setGuide(guide);
        }
      } catch (error) {

        if (!isUnmounted) {

          if (error?.response?.status === 404) {
            history.push('/guides');
          } else {
            console.error(error)
          }
        }
      }
    }



    let isUnmounted = false;
    fetchGuide();

    return () => {
      //la función que retorna es el component WillUnmount
      isUnmounted = true;
    }
  }, [history, params])



  const onClickDelete = async () => {

    await guidesService.remove(guide.id);
    history.push('/guides');
  }

  if (!guide) {
    return null
  } else {

    return (
      <div>
        <div className="container">
          <div className="main-body">

            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img src={guide.avatar} alt="Admin" className="rounded-circle" width="230" />
                      <div className="mt-3">
                        <h4>hi</h4>
                        <p className="text-secondary mb-1">Guide Id: {guide.guideLicense}</p>
                        <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                        <button className="btn btn-primary">Follow</button>
                        <button className="btn btn-outline-primary">Message</button>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
              <div className="col-md-8">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Full Name</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {guide.surname}, {guide.name}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {guide.email}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Mobile</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {guide.phoneNumber}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Languages</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {guide.languages
                          .map(language => (
                            <li key={language} className="card-text">{language}</li>
                          ))}
                      </div>
                    </div>                    
<img src={guide.images[0]} alt="Admin" className="rounded-circle" width="230" />
<img src={guide.images[1]} alt="Admin" className="rounded-circle" width="230" />


                  </div>
                </div>

              </div>


             

            </div>
            <div className="card flex mt-3 justify ">
              <div className="col-sm-12 ms-3 mt-3">
                <h5 className="mb-3">How can help you to discover this amazing city?</h5>
              </div >
              <p className="ms-3 me-3">{guide.experience}</p>

            </div>

            <div className="card">




              <div className="card-body">
                <Link to={'/guides'} className="text-danger me-5">Back to Guides</Link>

                {isAuthenticated() &&  (
                  <Link to={{
                    pathname: '/form-guide',
                    state: {
                      guide
                    }
                  }} className="text-danger" >Update Guide Details
                    <button type="button" className="btn btn-danger" onClick={onClickDelete}>Delete</button>

                  </Link>

                )}

              </div>

               <MessageForm /> 
              
            </div>
          </div>
        </div>


      </div>

    )
  }
}

export default GuideDetail;

