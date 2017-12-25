import React, { Component } from 'react';
// import PostsLoad from '../containers//PostsLoad'
// import NotesUsers from '../containers//NotesUsers'
//import WorkingPeople from '../containers/WorkingPeople'
import ImmutableVote from '../containers/ImmutableVote'


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
        <ImmutableVote/>
      </div>
    );
  }
}

export default App;
