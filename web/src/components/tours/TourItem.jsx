import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthStore';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react'



function TourItem({ tour }) {

  const { user } = useContext(AuthContext);

  return (
    <Card.Group as={Link} to={`/tours/${tour.id}`} 
    itemsPerRow={3}
    centered tour={tour}>
      
      <Card color='brown'>

      <Image src={tour.images[0]} className="card-img-top" alt={tour.title}  ui={false} />
     
      <Card.Content>

      
      <Card.Header>{tour.title}</Card.Header>

      <Card.Description>
        <span className="fw-lighter" style={{ color: '#d1410c', fontSize: '12px' }}>{moment(tour.start).format('llll')}</span>
        <span ><h5 className="card-title mt-2">{tour.description.slice(0, 20)}...</h5></span>
      </Card.Description>
      
    
      </Card.Content>

      </Card>

      </Card.Group>
  )
}

export default TourItem;
//className={`card shadow-sm rounded-0 border-0 ${user?.id === tour.owner.id ? 'border-info': ''}`}