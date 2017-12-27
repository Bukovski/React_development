//import { ADD_LIKE, ADD_DISLIKE } from '../constants';
import { Record, List } from 'immutable'; //https://github.com/facebook/immutable-js
import moment from 'moment';

export const TodoRecord = Record({
  title: '',
  description: '',
  deadline: '',
  priority: '',
  finished: '',
  id: null
});

export const StateRecord = Record({
  todos: List([ new TodoRecord({ id: moment() }) ]),
  filter: null
});

const initialState = new StateRecord();

export default function immutableTodo (state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.update('todos', todos => todos.insert(0, new TodoRecord({ id: moment() })));
    
    case 'REMODE_TODO':
      return state.update('todos', todos => todos.remove(action.payload));
    
    case 'UPDATE_TODO':
      const { index, field, value } = action.payload;
      return state.updateIn(['todos', index], todo => todo.set(field, value));
    
    default:
      return state;
  }
};

