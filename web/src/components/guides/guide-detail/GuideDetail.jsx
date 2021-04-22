import { React, useEffect, useState, useContext } from 'react';
import guidesService from '../../../services/guides-service';

import { Link, useHistory, useParams } from 'react-router-dom';
import { AuthContext } from './../../contexts/AuthStore';
import { MessageForm } from './../../messages/MessageForm';
import { Container, Divider, Segment, Modal, Button, Header } from 'semantic-ui-react'
import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import 'pure-react-carousel/dist/react-carousel.es.css';


import CustomDotGroup from '../../CustomDotGroup';

const constants = require('../../../constantsWeb')




function GuideDetail() {

  const history = useHistory()
  const params = useParams()
  const [guide, setGuide] = useState()
  const [open, setOpen] = useState(false)
  const { isAuthenticated } = useContext(AuthContext)

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
console.log(guide)
    return (

      
      <Container>

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
                      <Modal
    
      isOpen= 'false'
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header  closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login
            </Modal.Title>
      </Modal.Header>
      <Modal.Body  >
        

          
            

           

            <Button type="submit" color="outline-primary" block className="btn-social mb-3">
              <span className="d-none d-sm-inline">Login </span></Button>
          

          <hr data-content="OR" className="my-3 hr-text letter-spacing-2" />

          <Button olor="outline-muted" block className="btn-social mb-3">
            <i className="fa fa-google " />

            <span className="d-none d-sm-inline"> Login with Google</span>
          </Button>



    

      </Modal.Body>
      <Modal.Footer>
        <Button >Close</Button>
      </Modal.Footer>
    </Modal>



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

          {guide.images.length != 0 && 
          <Segment>
          <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={100}
                totalSlides={3}
              >
                <Slider>
                  <Slide tag="a" index={0}>
                    <Image size="small" src={guide.images[0]} />
                  </Slide>
                  <Slide tag="a" index={1}>
                    <Image src={guide.images[1]} />
                  </Slide>
                  <Slide tag="a" index={2}>
                    <Image src={guide.images[2]} />
                  </Slide>
                </Slider>

                <Divider />
                <CustomDotGroup slides={3} />
              </CarouselProvider>
              </Segment>}

          <div className="card">




            <div className="card-body">
              <Link to={'/guides'} className="text-danger me-5">Back to Guides</Link>

              {isAuthenticated() && (
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




      </Container>
    )
  }
}

export default GuideDetail;

