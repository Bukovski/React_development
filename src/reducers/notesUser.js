import { NEW_NOTES, DELETE_INDEX_NOTE, EDIT_INDEX_NOTE } from '../constants';

const initialState = {
  notes: [
    { id: 'dk3AdG', title: 'Title 1', text: 'Appropriately reinvent e-business data after.', times: '11:45:01'},
    { id: 'DAak51', title: 'Title 2', text: 'Distinctively maximize front-end e-markets without.', times: '21:50:48'},
    { id: 'Zp0d2K', title: 'Title 3', text: 'Interactively implement high-payoff technology whereas.', times: '01:30:00'}
  ]
};

export default function notesUser(state = initialState, action) {
  switch (action.type) {

    case NEW_NOTES:
      return { ...state, notes: [...state.notes,
          { id: action.payload, title: action.title, text: action.text, times: action.createDate }
        ] };
      
    case DELETE_INDEX_NOTE:
      return { ...state, notes: state.notes.filter((elem) => elem.id !== action.payload) };
  
    case EDIT_INDEX_NOTE:
      return { ...state, notes: state.notes.map(elem =>
        (elem.id === action.payload)
          ? { ...elem, title: action.title, text: action.text }
          : elem )
        };
  
  
    default:
      return state
  }
}