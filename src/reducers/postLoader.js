import { LOADED } from '../constants';

const initialState = {
  loaded: false,
  loading: []
};

export default function postLoad(state = initialState, action) {
  switch (action.type) {
    case LOADED:
      return { ...state, loaded: true, loading: action.payload };
      
    default:
      return state
  }
}
