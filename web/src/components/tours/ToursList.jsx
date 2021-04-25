import { useState, useEffect } from 'react';
import TourItem from './TourItem';
import { list } from '../../services/tours-service';
import Filter from './../Filter';
import { Header, Segment, Card, Checkbox, Grid } from 'semantic-ui-react'
import { categories } from '../../constantsWeb'
import PaginationTours from '../pagination/PaginationTours';



function ToursList({ minSearchChars }) {

  const [state, setState] = useState({
    tours: [],
    loading: false
  });
  const [loadingTours, setLoadingTours] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [toursPerPage, setToursPerPage] = useState(6);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState([])

  useEffect(() => {

    const fetchPagedTours = async () => {


      setLoadingTours(true);

      const tours = await list(search);

      if (!isUnmounted) {
        setState({
          tours: tours,
          loading: false
        })
        setLoadingTours(false);
      }
    }

    let isUnmounted = false;

    if (search.length >= minSearchChars || search.length === 0) {
      fetchPagedTours();
      setLoadingTours(false);
    }

    return () => {

      isUnmounted = true;
    }
  }, [search, minSearchChars]);

  const handleSearch = search => setSearch(search);


  useEffect(() => {

    async function fetchTours() {

      const tours = await list(null, category);
      if (!isUnmounted) {
        setState({
          tours: tours,
          loading: false
        })
      }
    }

    let isUnmounted = false;

    if (category.length > 0) {
      fetchTours();
    }

    return () => {

      isUnmounted = true;
    }
  }, [category]);


  const handleCategory = (event, result) => {

    let { value } = result || event.target;

    const category = value

    setCategory(category)


  }


  const { tours, loading } = state;

  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);


  return (

    <Grid centered columns={2}>

      <Grid.Row>
        <Header
          size='huge'
          textAlign='center'>
          Tour List
        </Header>
        <p className="fs-5 text-center">Here is a selection of the best tours designed by the same tours who will take you on the tour.</p>

        <Grid.Column width={3}>


          <Header as='h4'>Select a Category</Header>
          {categories.map((category, i) => (
            <div key={i}>

              <Checkbox

                toggle
                name={category.name}
                onClick={handleCategory}
                value={category.name}

                label={category.displayValue}
                className="mb-2 mt-1"
                onSearch={handleSearch}
                loading={loading}
              />

            </div>
          ))}


          <div className="mt-5">
            <Header as='h4'>Select by Text</Header>
            <Filter
              className="mt-3"
              onSearch={handleSearch}
              loading={loading} />

          </div>

        </Grid.Column >

        <Grid.Column width={10}>
          <Segment >

            <Card.Group  className="ms-4 mb-2 ms-2" >
              {currentTours.map(tour => (
                <div key={tour.id} className="col mt-4 " >

                  <TourItem tour={tour}
                  />
                </div>


              ))}
            </Card.Group>


          </Segment>






          <PaginationTours
            className="mb-5"
            toursPerPage={toursPerPage}
            totalTours={tours.length}
            paginate={paginate}
          />

        </Grid.Column>
      </Grid.Row>

    </Grid>

  )
}

ToursList.defaultProps = {
  minSearchChars: 1
}



export default ToursList;
