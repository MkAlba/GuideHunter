import React from 'react'
import { useHistory, useParams, Link } from "react-router-dom"
import { useState, useEffect, useContext } from 'react';
import { detail } from '../../services/tours-service';
import moment from 'moment';
import { MessageForm } from './../messages/MessageForm';

import { AuthContext } from '../contexts/AuthStore';

import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Divider, Grid, Segment, Header, Icon, Container } from "semantic-ui-react";




import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Media,
} from "reactstrap"

import Stars from "../Stars"
import CustomDotGroup from './../CustomDotGroup';





function TourDetail(props) {
  const history = useHistory()
  const params = useParams()
  const [tour, setTour] = useState()
  const { user } = useContext(AuthContext);

  useEffect(() => {
    //component didmount
    async function fetchTour() {

      try {
        const { id } = params;
        const tour = await detail(id);
 

        if (!isUnmounted) {

          setTour(tour);
        }
      } catch (error) {

        if (!isUnmounted) {

          if (error?.response?.status === 404) {
            history.push('/tours');
          } else {
            console.error(error)
          }
        }
      }
    }

    let isUnmounted = false;
    fetchTour();

    return () => {
      //la función que retorna es el component WillUnmount
      isUnmounted = true;
    }
  }, [history, params])


  if (!tour) {
    return null
  } else {

    return (

<Container >

      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' ><Icon name="photo" circular />
              <Header.Content >
                Tour Pictures
              </Header.Content>
            </Header>
            <Grid.Row>
              <CarouselProvider
                naturalSlideWidth={6}
                naturalSlideHeight={4}
                totalSlides={3}
              >
                <Slider>
                  <Slide tag="a" index={0}>
                    <Image size="small" src={tour.images[0]} />
                  </Slide>
                  <Slide tag="a" index={1}>
                    <Image src={tour.images[1]} />
                  </Slide>
                  <Slide tag="a" index={2}>
                    <Image src={tour.images[2]} />
                  </Slide>
                </Slider>

                <Divider />
                <CustomDotGroup slides={3} />
              </CarouselProvider>

            </Grid.Row>

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
          </Grid.Column>


          <Grid.Column>

            <Card className="d-flex ">



              <CardBody className="d-flex">
                <div className="w-100">
                  <Header as='h2' ><Icon name="info" circular className="mb-5" />
                    <Header.Content >
                      Tour Details
                  </Header.Content>
                  </Header>
                  <CardTitle tag="h6">
                    <h1 className="text-decoration-none" className="card-title">Tour Title: {tour.title}</h1>
                  </CardTitle>

                  <CardSubtitle className="d-flex mb-3 mt-2"> Rated with:
                    <p className="flex-shrink-1 mb-0 card-stars text-xs text-right ms-2">
                      <Stars stars={tour.stars} />
                    </p>

                  </CardSubtitle>

                  <h3 className="flex-grow-1 ">
                    {tour.description}
                  </h3>

                  <CardText className="mt-4">
                    <span className="h4 text-primary">Price: €{tour.price}</span>
                    &nbsp;per person
                    <p>            All taxes are included.</p>
                  </CardText>
                  <CardText className="text-muted">
                    <h3 className="h5">Day: {moment(tour.start).format('MMM Do YY')} </h3>
                    <h3 className="h5">Hour: {moment(tour.start).format('LT')} </h3>

                  </CardText>
                  <CardText className="text-muted">
                    <span className="h5">Duration: {tour.duration} Minutes</span>


                    <div className="mt-5 d-flex align-items-center  ">
                      <Media className="text-white text-sm align-items-center">
                        
                          <Link
                            to={`/guides/${tour.owner.id}`}>
                            <img
                              src={tour.owner.avatar}
                             
                              alt={tour.person}
                              className=" img-fluid rounded shadow-lg"
                              width={150}
                              height={150}
                              borderRadius = {150}
                              
                              
                            />
                          </Link>
                                       
                      </Media>
                      <div className='ms-2'>
                        A tour by {tour.owner.name}. Check my Profile to view all my tours.
                      </div>
                    </div>

                   

                  </CardText>

                </div>
              </CardBody>

            </Card>


          </Grid.Column>


        </Grid.Row>


      </Grid>
      </Container>
    )
  }
}

export default TourDetail

































