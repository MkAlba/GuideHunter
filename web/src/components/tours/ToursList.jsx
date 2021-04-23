import { useState, useEffect } from 'react';
import TourItem from './TourItem';
import { list } from '../../services/tours-service';
import Filter from './../Filter';
import { Container, Header, Segment, Card, Checkbox } from 'semantic-ui-react'
import { categories } from '../../constantsWeb'

function ToursList({ minSearchChars }) {

  const [state, setState] = useState({
    tours: [],
    loading: false
  });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState([])

  useEffect(() => {

    async function fetchTours() {

      console.log('aaaaaaaaaaa')
      const tours = await list(search);


      if (!isUnmounted) {
        setState({
          tours: tours,
          loading: false
        })
      }
    }

    let isUnmounted = false;

    if (search.length >= minSearchChars || search.length === 0) {
      fetchTours();
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
console.log(event.target)
    let {value}  =  result || event.target;
    
    const category = value
    console.log(category)
    setCategory(category)


  }
  

  const { tours, loading } = state;

  console.log(state)

  return (
    <Container>
      <Header
        size='huge'
        textAlign='center'>
        Tour List
        </Header>
      <p className="fs-5 text-center">Here is a selection of the best tours designed by the same guides who will take you on the tour.</p>
      <Segment.Group horizontal>
        <Segment>





          {categories.map((category, i) => (
            <div key={i}>

              <Checkbox
                name={category.name}
                onClick={handleCategory}
                value={category.name}
               
                label={category.displayValue}
                className="mb-3 mt-4" 
                onSearch={handleSearch} 
                loading={loading}
              />

            </div>
          ))}



          <Filter className="mb-3" onSearch={handleSearch} loading={loading} />


        </Segment>

        <Segment>

          <Card.Group >
            {tours.map(tour => (
              <div key={tour.id} className="col mt-4" >

                <TourItem tour={tour}
                />
              </div>


            ))}
          </Card.Group>


        </Segment>



      </Segment.Group>
    </Container>
  )
}

ToursList.defaultProps = {
  minSearchChars: 1
}



export default ToursList;
