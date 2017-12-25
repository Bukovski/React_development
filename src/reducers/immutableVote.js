import { ADD_LIKE, ADD_DISLIKE } from '../constants';
import { Map } from 'immutable'; //https://github.com/facebook/immutable-js


const initialState = Map({
//const initialState = ({
  views: 0,
  likes: 0,
  dislikes: 0
});

export default function voteImmutable(state = initialState, action) {
  switch (action.type) {
    case ADD_LIKE:
      //return Object.assign({}, state, { likes: state.likes + 1 });
      //return { ...state, likes: state.likes + 1 };
      return state.update('likes', likes => likes + 1);
    
    case ADD_DISLIKE:
      //return Object.assign({}, state, { dislikes: state.dislikes + 1 });
      //return { ...state, dislikes: state.dislikes + 1 };
      return state.update('dislikes', dislikes => dislikes + 1);
    
    default:
      return state;
  }
}