import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthStore';
import { Link } from 'react-router-dom';
import { Card, Image, Label } from 'semantic-ui-react'




function TourItem({ tour }) {

  const { user } = useContext(AuthContext);

  return (
   
      <Card
      as={Link}
      to={`/tours/${tour.id}`}
      color='brown'
      tour={tour}>


 



        <Image 
        src={tour.images[0]} 
          className="card-img-top" 
          alt={tour.title} 
          ui={false} />

        <Card.Content>

          {tour.owner.id === user?.id && 
            <Label color='teal' ribbon>
                  Yours
            </Label>
            }

          <Card.Header className="mt-1">{tour.title}</Card.Header>

          <Card.Description>
            <span className="fw-lighter" style={{ color: '#d1410c', fontSize: '12x' }}>{moment(tour.start).format('MMM Do YY')}</span>
            
            <span className="fw-lighter" style={{ color: '#d1410c', fontSize: '12px' }}>{moment(tour.start).format('LT')}</span>
            <span ><h5 className="card-title mt-2">{tour.description.slice(0, 25)}...</h5></span>
          </Card.Description>


        </Card.Content>

      </Card>


   
    )
}

export default TourItem;


//className={`card shadow-sm rounded-0 border-0 ${user?.id === tour.owner.id ? 'border-info': ''}`}