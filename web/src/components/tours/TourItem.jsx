import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthStore';
import { Link } from 'react-router-dom';



function TourItem({ tour }) {

  const { user } = useContext(AuthContext);

  return (
      <Link style={{ textDecoration: 'none' }} to={`/tours/${tour.id}`} className={`card shadow-sm rounded-0 border-0 ${user?.id === tour.owner.id ? 'border-info': ''}`}> 
      <img src={tour.image} className="card-img-top" alt={tour.title} />
      <div className="card-body">
        <span className="fw-lighter" style={{ color: '#d1410c', fontSize: '12px' }}>{moment(tour.start).format('llll')}</span>
        <div className="stretched-link link-unstyled" ><h5 className="card-title mt-2">{tour.title}</h5>
      </div>
      </div>
      </Link>
  )
}

export default TourItem;
