import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List, Map } from 'immutable';

class TableProducts extends Component {
  
  render() {
    const { products, checkProduct, deleteIndexProduct } = this.props;
    let countAllCheck = 0;
  
    const listProduct = products.map((elem, index) => {
      if (elem.get('checked')) {
        countAllCheck += elem.get('price') * elem.get('count')
      }
      return <tr key={ elem.get('id') }>
        <td>{ index + 1 }</td>
        <td>{ elem.get('title') }</td>
        <td>{ elem.get('price') }</td>
        <td>{ elem.get('count') }</td>
        <td>{ elem.get('price') * elem.get('count') }</td>
        <td>
          <input type='checkbox'
                 onChange={ (id) => checkProduct(elem.get('id')) }
                 checked={ elem.get('checked') }/>
        </td>
        <td><button className='btn btn-danger'
                    onClick={ () => deleteIndexProduct(elem.get('id')) }>Delete</button></td>
      </tr>
    });
    
    return(
      <div>
        <table className="table table-striped">
          <thead>
          <tr>
            <th>№</th>
            <th>Title</th>
            <th>Price</th>
            <th>Count</th>
            <th>Full Price</th>
            <th>Checked</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            { listProduct }
            <tr>
              <td colSpan="7">
                Sum all checked product: <b>{ countAllCheck }</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

TableProducts.defaultProps = {
  products: List([
    Map({ id: 1, title: 'No title', price: 0, count: 0, checked: false})
  ])
};

TableProducts.propTypes = {
  products: ImmutablePropTypes.list,
  deleteIndexProduct: PropTypes.func.isRequired,
  checkProduct: PropTypes.func.isRequired
};

export default TableProducts;
