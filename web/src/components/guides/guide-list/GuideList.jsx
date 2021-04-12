
import { useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
import guidesService from '../../../services/guides-service';
import GuideItem from '../guide-item/GuideItem';
import Filter from './../../Filter';
import SearchExampleStandardCustom from './../../FilterLanguage';
import { Dropdown, Label } from 'semantic-ui-react';
const constants = require('../../../constantsWeb')





function GuidesList({ minSearchChars }) {

  //const history = useHistory()

  const [state, setState] = useState({
    guides: [],
    loading: false
  });

  const [search, setSearch] = useState('');

  useEffect(() => {
    // componentDidMount

    async function fetchGuides() {

      setState(state => ({
        ...state,
        loading: true
      }))
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

  const handleLanguage = (event, result) => {

    let { value } = result || event.target;

    const search = value
    console.log(search)
    setSearch(search)
  }





  const { guides, loading } = state;






  return (
    <div className="row row-cols-4">
      <div className="col" className="mt-3 mb-2">
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
          value={search}
        />
      </div>

      <div>
        <Filter className="mb-3" onSearch={handleSearch} loading={loading} />
      </div>
      {state.guides.map(guide => (
        <div key={guide.id} className="col mb-4">
          <GuideItem {...guide}
          />
        </div>
      ))}
    </div>


  )

}

GuidesList.defaultProps = {
  minSearchChars: 1
}

export default GuidesList;