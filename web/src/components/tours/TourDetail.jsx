import React from 'react'
import { useHistory, useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import { detail } from '../../services/tours-service';
import moment from 'moment';
import { MessageForm } from './../messages/MessageForm';


import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Media,
} from "reactstrap"

import Stars from "../Stars"




function TourDetail(props) {
  const history = useHistory()
  const params = useParams()
  const [tour, setTour] = useState()


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
        <div>
        <Card  className="d-flex align-items-center">
          <div className="card-img-top overflow-hidden gradient-overlay">
            <img
              src={tour.image}
              width={600}
              height={300}
              alt={tour.title}
              layout="responsive"              
              className="img-fluid"
              sizes="(max-width:576px) 100vw, (max-width:991px) 50vw, (max-width:1199px) 30vw, 250px"
            />
           
            <div className="mt-5 d-flex align-items-center card-img-overlay-bottom ">
              <Media className="text-white text-sm align-items-center">
                <div className="avatar avatar-border-white me-4">
                  <img
                    src={tour.owner.avatar}
                    alt={tour.person}
                    layout="fixed"
                    width={90}
                    height={90}
                    className="img-fluid"
                  />
                  
                </div>
                {tour.owner.name}
              </Media>
              <div>
               A tour by {tour.owner.name}
               </div>
            </div>
            
          </div>
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
           
          </CardText>
            </div>
          </CardBody>

     

        </Card>

          <MessageForm 
          /> 
          </div>
    )
  }
}

export default TourDetail



































/*function TourDetail() {



  return (
    <Section >
      <div>111111</div>
    </Section>
  );
}

export default  TourDetail
*/