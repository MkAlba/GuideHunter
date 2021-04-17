import { useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
import guidesService from '../../../services/guides-service';
import GuideItem from '../guide-item/GuideItem';
import Filter from './../../Filter';
import { Dropdown, Grid, Segment } from 'semantic-ui-react';
const constants = require('../../../constantsWeb')





function GuidesList({ minSearchChars }) {

  //const history = useHistory()

  
  const [state, setState] = useState({
    guides: [],
    loading: true
  });

  const [search, setSearch] = useState('');
  const [languages, setLanguages] = useState([])





  useEffect(() => {
    // componentDidMount

    async function fetchGuides() {


      const guides = await guidesService.list(search);
      if (!isUnmounted) {
        setState({
          guides: guides,
          loading: false
        })
      }
    }

    let isUnmounted = false;

    if (search.length >= minSearchChars || search.length === 0) {
      fetchGuides();
    }

    return () => {
      // componentWillUnmount
      isUnmounted = true;
    }
  }, [search, minSearchChars]);

  const handleSearch = search => setSearch(search);





  useEffect(() => {

    async function fetchGuides() {

      const guides = await guidesService.list(null, languages);
      if (!isUnmounted) {
        setState({
          guides: guides,
          loading: false
        })
      }
    }

    let isUnmounted = false;

    if (languages.length > 0) {
      fetchGuides();
    }

    return () => {

      isUnmounted = true;
    }
  }, [languages]);




  const handleLanguage = (event, result) => {

    let { value } = result || event.target;

    const languages = value
    console.log(languages)
    setLanguages(languages)
  }



  const { guides, loading } = state;


  return (
    <Grid divided='vertically'>

      <Grid.Row columns={2}>
        <Grid.Column

          textAlign='center'>Select Languages
          <div className="col" className="mt-1">
            <Dropdown
              clearable
              fluid
              multiple
              search
              selection
              name="languages"
              options={constants.COUNTRY_OPTIONS}
              placeholder='Select Languages'
              onChange={handleLanguage}
              closeOnChange={true}
              value={languages}
            />
          </div>
        </Grid.Column>

        <Grid.Column
          textAlign='center'>Select By Name
          <div>
            <Filter className="mt-1" onSearch={handleSearch} loading={loading} />
          </div>
        </Grid.Column>
      </Grid.Row>


      <Grid.Row columns={4}>
        <Grid.Row >
          {state.guides.map(guide => (
            <div key={guide.id} className="col mb-4">
              <GuideItem {...guide}
              />
            </div>
          ))}
        </Grid.Row>
      </Grid.Row>
    </Grid>

  )

}

GuidesList.defaultProps = {
  minSearchChars: 1
}

export default GuidesList;