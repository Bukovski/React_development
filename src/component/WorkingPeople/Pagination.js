import React, { Component } from 'react';
import PropTypes from 'prop-types';


const range = (start, stop, step) => { //underscore.js
  if (stop === null) {
    stop = start || 0;
    start = 0;
  }
  if (!step) {
    step = stop < start ? -1 : 1;
  }
  
  const length = Math.max(Math.ceil((stop - start) / step), 0);
  const range = [length];
  
  for (let idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }
  
  return range;
};


class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }
  
  componentWillMount() {
    const { items, initialPage } = this.props;
    if (items && items.length) {
      this.setPage(initialPage);
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { items, initialPage } = this.props;
  
    if (items !== prevProps.items || items.length !== this.state.pager.totalItems) {
      this.setPage(initialPage);
    }
  }
  
  setPage(page) {
    const { items, onChangePage, pageSize } = this.props;
    let { pager } = this.state;
    
    if (page < 1 || page > pager.totalPages) return;
    
    pager = this.getPager(items.length, page, pageSize);
    
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    
    this.setState({ pager: pager });
    
    onChangePage(pageOfItems);
  }
  
  getPager(totalItems, currentPage, pageSize) {
    currentPage = currentPage || 1;
    pageSize = pageSize || 10;
    
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage, endPage;
    
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = range(startPage, endPage + 1);
    
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
  
  render() {
    const { pager } = this.state;
    //console.log(pager); //{ currentPage:1 endIndex:9 endPage:3 pageSize:10 pages:(3)[1, 2, 3]
    // startIndex:0 startPage:1 totalItems:29 totalPages:3 }
    
    if (!pager.pages || pager.pages.length <= 1) return null;
    
    return (
      <ul className="pagination">
        <li className={ pager.currentPage === 1 ? 'disabled' : '' }>
          <a onClick={ () => this.setPage(1) }>First</a>
        </li>
        <li className={ pager.currentPage === 1 ? 'disabled' : '' }>
          <a onClick={ () => this.setPage(pager.currentPage - 1) }>Previous</a>
        </li>
        { pager.pages.map((page, index) =>
          <li key={ index } className={ pager.currentPage === page ? 'active' : '' }>
            <a onClick={ () => this.setPage(page) }>{ page }</a>
          </li>
        )}
        <li className={ pager.currentPage === pager.totalPages ? 'disabled' : '' }>
          <a onClick={ () => this.setPage(pager.currentPage + 1) }>Next</a>
        </li>
        <li className={ pager.currentPage === pager.totalPages ? 'disabled' : '' }>
          <a onClick={ () => this.setPage(pager.totalPages) }>Last</a>
        </li>
      </ul>
    );
  }
}


Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  initialPage: PropTypes.number
};

Pagination.defaultProps = {
  initialPage: 1
};


export default Pagination;
