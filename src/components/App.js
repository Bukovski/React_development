import React, { Component } from 'react';
// import PostsLoad from '../containers//PostsLoad'
// import NotesUsers from '../containers//NotesUsers'
//import WorkingPeople from '../containers/WorkingPeople'
//import ImmutableVote from '../containers/ImmutableVote'
//import ImmutableTodo from '../containers/ImmutableTodo'
//import ImmutableTodoList from '../containers/ImmutableTodoList'
import ImmutableProduct from '../containers/ImmutableProduct'


class App extends Component {
  
  render() {
    return(
      <div className='container'>
        {/*<PostsLoad/>*/}
        <hr/>
        {/*<NotesUsers/>*/}
        <hr/>
        {/*<WorkingPeople/>*/}
        <hr/>
        {/*<ImmutableVote/>*/}
        <hr/>
        {/*<ImmutableTodo/>*/}
        <hr/>
        {/*<ImmutableTodoList/>*/}
        <hr/>
        <ImmutableProduct/>
      </div>
    );
  }
}

export default App;
