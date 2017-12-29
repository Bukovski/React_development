import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { reset } from 'redux-form';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { List, Map } from 'immutable';

import FormCreateProduct from './FormCreateProduct'
import TableProducts from './TableProducts'


class ImmutableProduct extends Component {
  
  formData = (values) => {
    const { clearForm, addNewProduct } = this.props;
    addNewProduct(values);
    clearForm();
  };
  
  render() {
    const { products, showingModal, checkProduct, deleteIndexProduct, showModalForm, hideModalForm } = this.props;
    
    return(
      <div>
        
        { showingModal &&
          <ModalContainer onClose={ hideModalForm }>
            <ModalDialog onClose={ hideModalForm } style={{ width: '400px' }}>
              
              <FormCreateProduct onSubmit={ this.formData }/>
              
            </ModalDialog>
          </ModalContainer>
        }
        
        <button type="button" onClick={ showModalForm } className="btn btn-info">Add new product</button>
  
        <TableProducts products={ products } checkProduct={ checkProduct } deleteIndexProduct={ deleteIndexProduct }/>
       
      </div>
    );
  }
}

ImmutableProduct.defaultProps = {
  products: List([
    Map({ id: 1, title: 'No title', price: 0, count: 0, checked: false})
  ]),
  showingModal: false
};

ImmutableProduct.propTypes = {
  products: ImmutablePropTypes.list,
  showingModal: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    products: state.immutableProduct.get('products'),
    showingModal: state.immutableProduct.get('showingModal')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteIndexProduct: (id) => dispatch({ type: 'DELETE_INDEX_PRODUCT', id }),
    checkProduct: (id) => dispatch({ type: 'CHECK_INDEX_PRODUCT', id }),
    clearForm: () => dispatch(reset('formProduct')),
    showModalForm: () => dispatch({ type: 'SHOW_MODAL_PRODUCT' }),
    hideModalForm: () => dispatch({ type: 'HIDE_MODAL_PRODUCT' }),
    addNewProduct: (data) => dispatch({ type: 'ADD_NEW_PRODUCT', data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImmutableProduct);
