import { useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
import guidesService from '../../../services/guides-service';
import GuideItem from '../guide-item/GuideItem';
import Filter from './../../Filter';
import { Dropdown, Grid, Container, Header } from 'semantic-ui-react';

import { countryOptions } from '../../../constantsWeb'
import Pagination from '../../../components/pagination/Pagination';





function GuidesList({ minSearchChars }) {

  const [state, setState] = useState({
    guides: [],
    loading: false,

  });

  const [loadingGuides, setLoadingGuides] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [guidesPerPage, setGuidesPerPage] = useState(6);

  const [search, setSearch] = useState('');
  const [languages, setLanguages] = useState([])



  useEffect(() => {

    const fetchPagedGuides = async () => {

      setLoadingGuides(true);

      const guides = await guidesService.list(search);
      if (!isUnmounted) {
        setState({
          guides: guides,
          loading: false
        })
        setLoadingGuides(false);
      }

    }
    let isUnmounted = false;

    if (search.length >= minSearchChars || search.length === 0) {
      fetchPagedGuides();
      setLoadingGuides(false)
    }

    return () => {

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

    setLanguages(languages)
  }


  const { loading, guides } = state;

  const indexOfLastGuide = currentPage * guidesPerPage;
  const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;
  const currentGuides = guides.slice(indexOfFirstGuide, indexOfLastGuide);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Container>
      <Header
        size='huge'

        textAlign='center'>
        Our Guide List
        </Header>
      <p className="fs-5 text-center">All these guides are official guides, ready to show you the secrets of Barcelona.</p>

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
                options={countryOptions}
                placeholder='Select Languages'
                onChange={handleLanguage}
                closeOnChange={true}
                value={languages}
              />
            </div>
          </Grid.Column>

          <Grid.Column
            textAlign='center'>Select By Name, Surname or Experience
          <div>
              <Filter className="mt-1" onSearch={handleSearch} loading={loading} />
            </div>
          </Grid.Column>
        </Grid.Row>


        <Grid.Row columns={6}>
          <Grid.Row >
            {currentGuides.map(guide => (
              <div key={guide.id} className="col mb-4">
                <GuideItem {...guide}

                />
              </div>
            ))}
          </Grid.Row>
        </Grid.Row>
      </Grid>








      <Pagination
        guidesPerPage={guidesPerPage}
        totalGuides={guides.length}
        paginate={paginate}
      />


    </Container>
  )

}

GuidesList.defaultProps = {
  minSearchChars: 1
}

export default GuidesList;