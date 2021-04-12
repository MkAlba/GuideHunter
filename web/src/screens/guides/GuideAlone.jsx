import GuideDetail from '../../components/guides/guide-detail/GuideDetail';
import Section from '../../components/section/section';

function GuideAlone(props) {

  const guideId = props.match.params.id

  return (
    <Section >
      <GuideDetail id={guideId} />
    </Section>
  );
}

export default GuideAlone;
