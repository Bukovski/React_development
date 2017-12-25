import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { like, dislike } from '../../actions'


class ImmutableVote extends Component {
  render() {
    const { likes, dislikes, like, dislike } = this.props;
    
    return(
      <div>
        <img src="https://pp.userapi.com/c837524/v837524102/1feb/Qs2ln2sjZV0.jpg" alt="Some logo"
             style={{ height: 400 }}/>
  
        <p>Like: { likes } Dislike: { dislikes }</p>
        <div>
          <button onClick={ like }>Like</button>
          <button onClick={ dislike }>Dislike</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //likes: state.immutableVote.likes,
  //dislikes: state.immutableVote.dislikes
  likes: state.immutableVote.get('likes'),
  dislikes: state.immutableVote.get('dislikes')
});

const mapDispatchToProps = dispatch => ({
  // like: () => dispatch({ type: 'ADD_LIKE' }),
  // dislike: () => dispatch({ type: 'ADD_DISLIKE' })
  //like: bindActionCreators(like, dispatch),
  //dislike: bindActionCreators(dislike, dispatch)
  like: () => dispatch( like() ),
  dislike: () => dispatch( dislike() )
});

export default connect(mapStateToProps, mapDispatchToProps)(ImmutableVote);
