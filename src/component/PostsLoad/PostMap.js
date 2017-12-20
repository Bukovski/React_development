import React from 'react';
import openWrap from '../../decorators/openWrap'
import PropTypes from 'prop-types'

const PostMap = ({ post, isOpen, toggleOpen }) => (
  <span>{
    <div>
      <h3>{post.title}</h3>
      <button onClick={ toggleOpen }>
        { (isOpen) ? 'hide post' : 'show post' }
      </button>
      { (isOpen) ? <p>{post.content}</p> : '' }
    </div>
  }</span>
);

PostMap.propTypes = {
  //index.js
  post: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
  }).isRequired,
  //PostsOpenWrap
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired
};


export default openWrap(PostMap)