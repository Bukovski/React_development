import { combineReducers } from 'redux';
import postLoader from './postLoader';
import notesUser from './notesUser';
import tableWorkers from './tableWorkers';
import immutableVote from './immutableVote';
import immutableTodo from './immutableTodo';
import immutableTodoList from './immutableTodoList';

const rootReducer = combineReducers({
  postLoader: postLoader,
  notesUser: notesUser,
  tableWorkers: tableWorkers,
  immutableVote: immutableVote,
  immutableTodo: immutableTodo,
  todoList: immutableTodoList
});

export default rootReducer;
