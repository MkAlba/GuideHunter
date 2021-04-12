import { Link } from 'react-router-dom'
import './GuideItem.css';
import Section from './../../section/section';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';






function GuideItem({ name, surname, owner, email, guideLicense, phoneNumber, experience, avatar, images, languages, id, experienceMaxChars, onClickDelete }) {

  const { user } = useContext(AuthContext);
  
  return (
                             
<Section className={`card shadow-sm rounded-0 border-0 ${user?.id  ? 'border-info': ''}`}> 
       
         
            <img className="rounded-circle" style= {{height:120}}src={avatar} alt="Guide" />

              <h4 className="name">{name} {surname}</h4>
              <Link to={`/guides/${id}`}>
              </Link>
              <p className="title">Guide ID: {guideLicense}</p>
              <p className="experience">{experience.slice(0, experienceMaxChars)}...</p>


              

            
              

              <Link to={`/guides/${id}`}>
              <div className="social"><i className="fa fa-plus-square">More about me</i></div>
              </Link>
 
          
        
      

    
    </Section>



  )
}

GuideItem.defaultProps = {
  titleMaxWords: 4,
  experienceMaxChars: 100
}
export default GuideItem;
/*
<div className="container-responsive">
<div className="row" id="portfolio" data-isotope='{"layoutMode": "fitRows"}'>
  <div className="col-12 col-md-11">



      <div className="card-footer">


        <h5 className="mb-3">Email: {email}</h5>
        <h6 className="mb-3">Phone Number: {phoneNumber}</h6>

        {languages && (
      <div className="col">
        {languages.map(language => <span className="">{ <ul> {language}</ul>}</span>)}
      </div>
    )}

        <h6 className="mb-3">Languages: {languages}</h6>
        <h className="mb-0">Who Am I?

        </h>
      </div>

      <i className="fa fa-trash-o" />
      <button
  className="btn btn-danger"
  onClick={() => onClickDelete(id)}>Delete
</button>

  </div>


</div>
</div>*/