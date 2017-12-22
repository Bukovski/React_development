import React from 'react';
import PropTypes from 'prop-types'


const SearchInput = ({ liveSearch }) => (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search" onChange={ liveSearch }/>
        <div className="input-group-addon">
          <i className="glyphicon glyphicon-search"></i>
        </div>
      </div>
);

SearchInput.propTypes = {
  liveSearch: PropTypes.func.isRequired
};

export default SearchInput;
