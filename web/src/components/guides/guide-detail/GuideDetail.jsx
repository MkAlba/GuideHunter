import { React, useEffect, useState, useContext } from 'react';
import guidesService from '../../../services/guides-service';

import { Link, useHistory, useParams } from 'react-router-dom';
import { AuthContext } from './../../contexts/AuthStore';
import { MessageForm } from './../../messages/MessageForm';
import { Container, Divider, Segment, Header, Grid, Flag, Button, Icon, Label,Table } from 'semantic-ui-react'
import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import 'pure-react-carousel/dist/react-carousel.es.css';


import CustomDotGroup from '../../CustomDotGroup';


const flagRenderer = (item) => <Flag name={item} />


function GuideDetail() {

  const history = useHistory()
  const params = useParams()
  const [guide, setGuide] = useState()
 
  const { user, isAuthenticated } = useContext(AuthContext)


  useEffect(() => {

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

      <Container>

         <div className="main-body">

        <Segment>

          <div className="row gutters-sm">
            <div className="col-md-3 ms-1 mb-1">
              <div className="card border-0 mt-1">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={guide.avatar} alt="Admin" className="rounded" width="200" />
                    <div className="mt-3">
                      <h2>{guide.name}</h2>
                      <p className="text-secondary mb-1">Guide Id: {guide.guideLicense}</p>
                      <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                      
                      <div className="text-center mt-5 ">
                                <Button as='div' labelPosition='left'>
                                    <Button basic
                                        centered
                                        size='medium'

                                        color='brown'>
                                        <Icon name='address book' />
                                    Tour by me
                                </Button>
                                    <Label as='a' basic color='black' pointing='left'>
                                        User Details
                                </Label>
                                </Button>
                            </div>
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      <button className="btn btn-outline-secondary">My Tours</button>
                    </div>
                  </div>
                </div>
              </div>


            </div>
            <div className="col-md-4">
              <div className="card mt-1 mb-3">
                <div className="card-body">

                <div className="row">                    
                    <h5 class="card-title fs-4 text-center">Personal Details</h5>
                 </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-6 fs-5 fw-bold">
                      {guide.surname}, {guide.name}
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Guide License</h6>
                    </div>
                    <div className="col-sm-6 fw-bold">
                      {guide.guideLicense}
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-6 text-secondary">
                      {guide.email}
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Mobile</h6>
                    </div>
                    <div className="col-sm-6 text-secondary">
                      {guide.phoneNumber}
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-4">
                      <h6 className="mb-0">Languages</h6>
                    </div>
                    <div className="col-sm-6 text-secondary">

                      {guide.languages.map((language) => (

                        <Table.Cell key={language.countryCode}>{flagRenderer(language)}</Table.Cell>

                      ))}

                    </div>
                  </div>


                </div>
              </div>

            </div>

            <div className="col-md-4">
            {!user ? <Segment
              as={Link}
              to={'/register'}
              circular
              size="mini"
              fluid
              style={{ width: 70, height: 70 }}>
              <Header as='h2' >
                Any question?
                    <Header.Subheader>Become GuideHunter member </Header.Subheader>
              </Header>
            </Segment> :
            
            
            <MessageForm />
            
            }
          </div>        
          </div>

          </Segment>

          <Segment>
             <Grid columns ={2}>         

          
           <Grid.Row>
             <Grid.Column>
          <div className="p-2 justify ">
            
              <h5 className="mb-3  fs-3 text-center">How can help you to discover this amazing city?</h5>
           
            <p className="ms-3 me-3 fs-5  text-break lh-base">{guide.experience}</p>

          </div>
          </Grid.Column>
         
          <Grid.Column> 
            <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={100}
              totalSlides={3}
            >
              <Slider>
                <Slide tag="a" index={0}>
                  <Image rounded size="small" src={guide.images[0]} />
                </Slide>
                <Slide tag="a" index={1}>
                  <Image  rounded src={guide.images[1]} />
                </Slide>
                <Slide tag="a" index={2}>
                  <Image rounded src={guide.images[2]} />
                </Slide>
              </Slider>

              <Divider />
              <CustomDotGroup slides={3} />
            </CarouselProvider>
          
            </Grid.Column>
          </Grid.Row>
          </Grid> 
          </Segment>
          <div className="card">




            <div className="card-body">
              <Link to={'/guides'} className="text-danger me-5">Back to Guides</Link>

              {guide.id === user?.id && (
                <Link 
                  to={{
                  pathname: '/form-guide',
                  state: {
                    guide
                  }
                }} className="text-danger" >Update Guide Details
                  <button type="button" className="btn btn-danger" onClick={onClickDelete}>Delete</button>

                </Link>

              )}

            </div>

            

          </div>
         
        </div>




      </Container>
    )
  }
}

export default GuideDetail;

