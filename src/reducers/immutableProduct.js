//import { LOADED } from '../constants';
import { Record, fromJS } from 'immutable';
import moment from 'moment';

const initialState = fromJS({
  products: [
    { id: 1, title: 'Banana', price: 500, count: 5, checked: true},
    { id: 2, title: 'Grapes', price: 100, count: 7, checked: true},
    { id: 3, title: 'Cabbage', price: 50, count: 1, checked: true},
  ],
  showingModal: false
});

export const ProductRecord = Record({
  id: null,
  title: '',
  price: 0,
  count: 0,
  checked: true
});

export default function productImmutable(state = initialState, action) {
  switch (action.type) {
    
    case 'DELETE_INDEX_PRODUCT':
      return state.update('products', product => product.filter(elem => elem.get('id') !== action.id ))
  
    case 'CHECK_INDEX_PRODUCT':
      
      return state.update('products', product => product.map(elem => {
        return (elem.get('id') === action.id)
          ? elem.set('checked', !elem.get('checked'))
          : elem
      } ));
    
    case 'SHOW_MODAL_PRODUCT':
      return state.set('showingModal', true);
      
    case 'HIDE_MODAL_PRODUCT':
      return state.set('showingModal', false);
  
    case 'ADD_NEW_PRODUCT':
      const { title, price, count } = action.data;
      return state.set('products', state.get('products').push(new ProductRecord({
        id: moment().valueOf(), title: title, price: price, count: count
      }) ));
  
    default:
      return state
  }
}
