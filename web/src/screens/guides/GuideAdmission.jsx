import GuideForm from '../../components/guides/guide-form/GuideForm';
import Section from '../../components/section/section';



function GuideAdmission(props) {
  

  if(props.location.state != null) { 
    const guide = props.location.state.guide 
    console.log(guide)
    return (

      <Section  title="">
        <GuideForm guide ={guide} />
      
      
    </Section>        
    );
    
  } else {
    return (

      <Section title="">
       
      <GuideForm />
      
    </Section>        
    );

  }
          

}


export default GuideAdmission;
