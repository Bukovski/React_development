import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import postLoader from './postLoader';
import notesUser from './notesUser';
import tableWorkers from './tableWorkers';
import immutableVote from './immutableVote';
import immutableTodo from './immutableTodo';
import immutableTodoList from './immutableTodoList';
import immutableProduct from './immutableProduct';

const rootReducer = combineReducers({
  postLoader: postLoader,
  notesUser: notesUser,
  tableWorkers: tableWorkers,
  immutableVote: immutableVote,
  immutableTodo: immutableTodo,
  todoList: immutableTodoList,
  immutableProduct: immutableProduct,
  form: formReducer
});

export default rootReducer;
