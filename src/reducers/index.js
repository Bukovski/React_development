import { combineReducers } from 'redux';
import postLoader from './postLoader';
import notesUser from './notesUser';
import tableWorkers from './tableWorkers';
import immutableVote from './immutableVote';

const rootReducer = combineReducers({
  postLoader: postLoader,
  notesUser: notesUser,
  tableWorkers: tableWorkers,
  immutableVote: immutableVote
});

export default rootReducer;
