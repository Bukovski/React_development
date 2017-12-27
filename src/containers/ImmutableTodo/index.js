import React, { Component } from 'react';
import { connect } from 'react-redux';

import TodoItem from './TodoItem'
import styled from 'styled-components';

const Header = styled.h1``;
const List = styled.ul`list-style-type: none;`;

class ImmutableTodo extends Component {
  
  _renderTodos(todos) {
    return <List>{ todos.map((todo, index) => {
      return <li key={ todo.get('id') }>
        <TodoItem index={ index }/>
      </li>
    }) }</List>
  }
  
  render() {
    const { todos } = this.props;
    
    return(
      <div>
        <Header>Todo List</Header>
        { this._renderTodos(todos) }
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    todos: state.immutableTodo.get('todos')
  }
}


export default connect(mapStateToProps)(ImmutableTodo);
