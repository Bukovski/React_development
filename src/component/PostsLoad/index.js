import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as loadPosts from '../../actions'
import { posts } from '../../jsonData/blog-posts.json'

import PostMap from './PostMap'


class PostsLoad extends Component {
  componentDidMount () {
    setTimeout(() => {
      this.props.loadAction.loadPosts(posts);
    }, 2000)
  }
  
  render() {
    const { loaded, loading } = this.props;

    return(
      <div className='row'>
        { (loaded) ? loading.map(post => <PostMap key={ post.id } post={ post }/> )
          : <h2>Loading...</h2> }
      </div>
    );
  }
}

PostsLoad.propTypes = {
  //reducer
  loaded: PropTypes.bool.isRequired,
  loading: PropTypes.array.isRequired,
  loadAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    loaded: state.postLoader.loaded,
    loading: state.postLoader.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadAction: bindActionCreators(loadPosts, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsLoad);
