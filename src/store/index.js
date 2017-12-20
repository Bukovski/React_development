import { createStore, applyMiddleware } from 'redux' //метод добавления усилитей с помощью applyMiddleware
import thunk from 'redux-thunk'


import rootReducer from '../reducers'

export default function configureStore(initialState) {
  
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //redux console
  
  return store
}