import { NEW_WORKER, FAKER_WORKER } from '../constants';

const initialState = {
  workers: [
    {id: 1, firstName: 'John', lastName: 'Dou', salary: 100, gender: 'male'},
    {id: 2, firstName: 'Alessa', lastName: 'Gelespi', salary: 150, gender: 'female'},
    {id: 3, firstName: 'Donald', lastName: 'Duck', salary: 130, gender: 'male'},
    {id: 4, firstName: 'Joey', lastName: 'Tribiany', salary: 205, gender: 'male'}
  ]
};


export default function tableWorker(state = initialState, action) {
  switch (action.type) {
    
    case NEW_WORKER:
      return { ...state, workers: [...state.workers,
        { id: action.id, firstName: action.firstName,
          lastName: action.lastName, salary: action.salary, gender: action.gender }
      ] };
  
    case FAKER_WORKER:
      return { ...state, workers: [...state.workers, ...action.arrNewWorkers] };
    
    default:
      return state
  }
}
