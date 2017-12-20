import { combineReducers } from 'redux';
import postLoader from './postLoader';
import notesUser from './notesUser';

const rootReducer = combineReducers({
  postLoader: postLoader,
  notesUser: notesUser
});

export default rootReducer;
