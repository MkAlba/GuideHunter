import { Link } from 'react-router-dom'
import './GuideItem.css';
import Section from './../../section/section';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Card, Image, Dropdown } from "semantic-ui-react";
const moment = require('moment');
const constants = require('../../../constantsWeb')





function GuideItem({ name, surname, owner, email, createdAt, guideLicense, phoneNumber, experience, avatar, images, languages, id, experienceMaxChars, onClickDelete }) {

  const { user } = useContext(AuthContext);
  console.log(user)

  return (

    <Section className={`${user?.id ? 'border-info' : ''}`}>
      <Card
        color='brown'
      >

        <Image className="rounded-circle" src={avatar} alt="Guide" wrapped ui={false} />

        <Card.Content>
          <Card.Header className="name mt-1 mb-1">{name} {surname}</Card.Header>
          <Card.Meta className="mt-1 mb-1">GuideHunter since {moment(createdAt).format('YYYY')}

            <Dropdown
              multiple
              name="languages"
              options={constants.COUNTRY_OPTIONS}
              value={languages}
            />

            <p className="title">Guide ID: {guideLicense}</p>
            <p className="experience">{experience.slice(0, experienceMaxChars)}...</p>

            <Link to={`/guides/${id}`}>
              <div className="social "><i className="fa fa-plus-square">More about me</i></div>
            </Link>
          </Card.Meta>
        </Card.Content>
      </Card>
    </Section>

  )
}

GuideItem.defaultProps = {
  titleMaxWords: 4,
  experienceMaxChars: 100
}
export default GuideItem;
