import { Link } from 'react-router-dom'
import './GuideItem.css';
import Section from './../../section/section';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Card, Image, Table, Flag } from "semantic-ui-react";
import {countryOptions} from '../../../constantsWeb';


const moment = require('moment');




const flagRenderer = (item) => <Flag name={item} />


function GuideItem({ name, surname, owner, email, createdAt, guideLicense, phoneNumber, experience, avatar, images, languages, id, experienceMaxChars, onClickDelete }) {

  const { user } = useContext(AuthContext);


  return (

    <Section className={`${user?.id ? 'border-info' : ''}`}>
      <Card
        color='brown'
        as={Link}
        to={`/guides/${id}`}
      >

        <Image className="rounded-circle" src={avatar} alt="Guide" wrapped ui={false} />

        <Card.Content>
          <Card.Header className="name mt-1 mb-1">{name} {surname}</Card.Header>
          <Card.Description className="mt-1 mb-1">GuideHunter since {moment(createdAt).format('YYYY')}

            <Table size='large'
            basic="very"
            compact='very'
            collapsing>
              
          
              <Table.Body>
      {languages.map((language) => (
         
          <Table.Cell key={language.countryCode}>{flagRenderer(language)}</Table.Cell>
          
        
      ))}
  </Table.Body>
  </Table>










            <p className="title">Guide ID: {guideLicense}</p>
            <p className="experience">{experience.slice(0, experienceMaxChars)}...</p>
            
          </Card.Description>
        </Card.Content>
      </Card>
    </Section>

  )
}

GuideItem.defaultProps = {
  titleMaxWords: 4,
  experienceMaxChars: 40
}
export default GuideItem;
