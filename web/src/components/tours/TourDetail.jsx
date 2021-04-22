import React from 'react'
import { useHistory, useParams, Link } from "react-router-dom"
import { useState, useEffect, useContext } from 'react';
import { detail } from '../../services/tours-service';
import moment from 'moment';
import { MessageForm } from './../messages/MessageForm';

import { AuthContext } from '../contexts/AuthStore';

import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import { Divider, Grid, Segment, Header } from "semantic-ui-react";
import 'pure-react-carousel/dist/react-carousel.es.css';



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
        console.log(tour)

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

      

      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
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

            {!user &&  <Segment 
              as={Link}
              to={'/register'}
              circular 
              size="mini"
              style={{ width: 70, height: 70}}>
      <Header as='h2' >
        Any question?
        <Header.Subheader>Become GuideHunter member </Header.Subheader>
      </Header>
    </Segment>}
          </Grid.Column>


          <Grid.Column>

            <Card className="d-flex">


              <CardBody className="d-flex align-items-center">
                <div className="w-100">

                  <CardTitle tag="h6">
                    <p className="text-decoration-none text-dark">{tour.title}</p>
                  </CardTitle>

                  <CardSubtitle className="d-flex mb-3">
                    <p className="flex-shrink-1 mb-0 card-stars text-xs text-right">
                      <Stars stars={tour.stars} />
                    </p>

                  </CardSubtitle>
                  <p className="flex-grow-1 mb-0 text-muted text-sm">
                    {tour.description}
                  </p>

                  <CardText className="text-muted">
                    <span className="h4 text-primary">${tour.price}</span>
                    &nbsp;per night
                 </CardText>
                  <CardText className="text-muted">
                    <span className="h5">{moment(tour.start).format('llll')} </span>

                  </CardText>
                  <CardText className="text-muted">
                    <span className="h5">{tour.duration} Minutes</span>

                 
              <div className="mt-5 d-flex align-items-center card-img-overlay-bottom ">
                <Media className="text-white text-sm align-items-center">
                  <div className="avatar avatar-border-white me-4">
                    <Link
                    to={`/guides/${tour.owner.id}`}>
                    <img
                      src={tour.owner.avatar}
                      alt={tour.person}
                      
                      
                      layout="fixed"
                      width={90}
                      height={90}
                      className="img-fluid"
                    />
</Link>
                  </div>
                  {tour.owner.name}
                </Media>
                <div>
                  A tour by {tour.owner.name}
                </div>
              </div>

              
                  <MessageForm />

                  </CardText>
                  
                </div>
              </CardBody>
           
            </Card>


          </Grid.Column>


        </Grid.Row>

        
      </Grid>

    )
  }
}

export default TourDetail

































