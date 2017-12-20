import React, { Component } from 'react';
// import PostsLoad from './PostsLoad'
// import NotesUsers from './NotesUsers'
import WorkingPeople from './WorkingPeople'

class App extends Component {
  
  render() {
    return(
      <div className='container'>
        {/*<PostsLoad/>*/}
        <hr/>
        {/*<NotesUsers/>*/}
        <hr/>
        <WorkingPeople/>
      </div>
    );
  }
}

export default App;
