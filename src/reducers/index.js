import { combineReducers } from 'redux';
import postLoader from './postLoader';
import notesUser from './notesUser';
import tableWorkers from './tableWorkers';

const rootReducer = combineReducers({
  postLoader: postLoader,
  notesUser: notesUser,
  tableWorkers: tableWorkers
});

export default rootReducer;
