import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Title = styled.input`
  font-size: 20px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 2px;
  outline: none;
  width: 350px;
`;

const Description = styled.input`
  font-size: 16px;
  color: gray;
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 2px;
  outline: none;
  width: 350px;
`;

class TodoItem extends Component {
  render() {
    const {title, description, addTodo, removeTodo, index, updateTodo} = this.props;
    
    const first = index === 0;
    
    return(
      <div>
        <div>{ index }</div>
        <Title type="text" defaultValue={ title }
               onChange={ (e) => { updateTodo({
                 index,
                 value: e.target.value,
                 field: 'title'
               }) } }/>
        <br/>
        <Description type="text" defaultValue={ description }
                     onChange={ (e) => { updateTodo({
                       index,
                       value: e.target.value,
                       field: 'description'
                     }) } }/>
        <br/>
        { first ?
          <button onClick={ addTodo }>Add</button> :
          <button onClick={ () => removeTodo(index) }>Delete</button> }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    title: state.immutableTodo.getIn(['todos', ownProps.index, 'title']),
    description: state.immutableTodo.getIn(['todos', ownProps.index, 'description'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: payload =>
      dispatch({
        type: 'ADD_TODO'
      }),
    removeTodo: payload =>
      dispatch({
        type: 'REMODE_TODO',
        payload
      }),
    updateTodo: payload =>
      dispatch({
        type: 'UPDATE_TODO',
        payload
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
