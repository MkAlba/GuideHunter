import { useState } from 'react';
import { Search } from 'semantic-ui-react'

function Filter({ className, onSearch, loading }) {

  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
    onSearch(value);
  }

  return (
    <div className={`row row-cols-1 ${className}`}>
      <div className="col">
        <div className="input-group mb-2">
          
          <input type="text" name="name"  className="form-control rounded" placeholder="Search by text..."
            value={search} onChange={handleChange} />
            <span class="input-group-text border-0">
            <i className={`fa fa-${loading ? 'refresh fa-search': 'search'}` }></i>
          </span>
        </div>
      </div>
    </div>
    
  )
}

Filter.defaultProps = {
  loading: false,
  className: '',
  onSearch: () => {}
}

export default Filter;
