//import { LOADED } from '../constants';
import { List, Map, Record } from 'immutable';
import moment from 'moment';

const initialState = Map({
  todo: List([
    { id: 1, title: 'some title1', text: 'some text1', done: true},
    { id: 2, title: 'some title2', text: 'some text2', done: false},
  ]),
  updateTodo: false,
  cashUpdate: {}
});

export const TodoRecord = Record({
  id: null,
  title: '',
  text: '',
  done: false
});

export default function postLoad(state = initialState, action) {
  switch (action.type) {
  
    case 'ADD_NEW_TODO':
      const { title, text } = action.data;
      /*return state.update('todo', todo => todo.push(new TodoRecord({
        id: moment().valueOf(), title, text, done: false
      })) );*/
      return state.set('todo', state.get('todo').push(new TodoRecord({
        id: moment().valueOf(), title, text, done: false
      }) ));
  
    case 'REMOVE_LAST_TODO':
      /*const lastId = state.get('todo').last().id;
      return state.update('todo', todo => todo.filter(elem => elem.id !== lastId));*/
      const lastElem = state.get('todo').size - 1;
      return state.set('todo', state.get('todo').splice(lastElem, 1));
      
    case 'REMOVE_INDEX_TODO':
      return state.update('todo', todo => todo.filter(elem => elem.id !== action.id));
      
    case 'DONE_TODO':
      return state.update('todo', todo => todo.map(elem => (elem.id === action.id) ?
        { id: elem.id, title: elem.title, text: elem.text, done: !elem.done }
        : elem ));
      
    case 'UPDATE_BUTTON_TODO':
      return state.set('updateTodo', action.changeButton);
  
    case 'CASH_UPDATE_TODO':
      const getData = action.data;
      return state.set('cashUpdate', new TodoRecord({
        id: getData.id, title: getData.title, text: getData.text, done: false
      }));
  
    case 'CASH_CLEANER_TODO':
      return state.set('cashUpdate', {});
  
    case 'CONCAT_CASH_TODO':
      const getCash = state.get('cashUpdate');
      return state.update('todo', todo => todo.map(elem => (elem.id === getCash.id) ?
        { id: getCash.id, title: getCash.title, text: getCash.text, done: getCash.done }
        : elem ));
  
    default:
      return state
  }
}
