import { useState, useEffect } from 'react';
import TourItem from './TourItem';
import {list} from '../../services/tours-service';
import Filter from './../Filter';


function ToursList(minSearchChars) {
  const [state, setState] = useState({
    tours: [],
    loading: false
  });
   const [search, setSearch] = useState('');

    useEffect(() => {
    

    async function fetchTours() {

      setState(state => ({
        ...state,
        loading: true
      }))
  
      
      const tours = await list();

     
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
     
      isUnmounted =  true;
    }
  }, [search, minSearchChars]); 

  const handleSearch = search => setSearch(search);
  
  const { tours,loading } = state;
console.log(state)
  return (
    
     <section className=" container  ">
      
      <div className="row row-cols-3">
        <div className = "col-3">
        <Filter className="mb-3" onSearch={handleSearch} loading={loading} />
        <Filter className="mb-3" onSearch={handleSearch} loading={loading} />
        <Filter className="mb-3" onSearch={handleSearch} loading={loading} />
        <Filter className="mb-3" onSearch={handleSearch} loading={loading} />
        <Filter className="mb-3" onSearch={handleSearch} loading={loading} />
        </div>
        <div className = "col">          

        {tours.map(tour => (
          <div key={tour.id} >
            <TourItem tour={tour} 
            />
            </div>
        ))}
      </div>
      </div>
      </section> 
    
  )
}



export default ToursList;
