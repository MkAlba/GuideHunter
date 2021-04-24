import TourDetail from '../../components/tours/TourDetail';
import Section from '../../components/section/section';


function TourAlone(props) {

  const tourId = props.match.params.id

  return (
    <Section >
      <TourDetail id={tourId} />


    </Section>
  );
}

export default TourAlone;