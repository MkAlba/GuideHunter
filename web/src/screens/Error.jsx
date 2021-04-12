
import { Link } from 'react-router-dom';

import error404 from '../images/LogoBlancNegro.jpg';
import error403 from '../images/LogoBlancNegro.jpg';

function Error({ code }) {

  let errorImage

  switch (code) {
    case 404:
      errorImage = error404;
      break;
    case 403:
      errorImage = error403;
      break;
      
    default:
      break;
  }

  return (
    <div className="row text-center row-cols-1">
        <h3 className="text-center ">UPSSSSSS Sorry error{code}</h3>
        <div className="col mt-1"><Link className="btn btn-link link-unstyled" to="/guides"> <i className="fa fa-search" /> Back to Guides Page!!!</Link></div>

     <img className="col ms-5" src={errorImage} style={{ width: "70%"}}alt={`Error ${code}`} /> 
    </div>
  )
}

export default Error;
