import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.css'

class ImmutableTodoList extends Component {
  
  createNewTodo = (event) => {
    event.preventDefault();
    
    const title = this.titleInput.value;
    const text = this.textInput.value;
  
    if(title.length > 3 && text.length > 3) {
      this.titleInput.value = '';
      this.textInput.value = '';
  
      this.props.addNewTodo({title, text})
    }
  };
  
  removeIndex(index) {
    this.props.removeIndexTodo(index);
  }
  
  doneUndone(index) {
    this.props.doneTodo(index)
  }
  
  updateListTodo(elem) {
    const { cashUpdateTodo, updateButtonTodo } = this.props;
  
    updateButtonTodo(true);
    cashUpdateTodo(elem);
    
    return this.titleInput.value = elem.title,
      this.textInput.value = elem.text;
  }
  
  clearChangeTodo() {
    const { cashClearTodo, updateButtonTodo } = this.props;
    
    this.titleInput.value = '';
    this.textInput.value = '';
    
    cashClearTodo();
    
    updateButtonTodo(false);
  }
  
  updateChangeTodo() {
    const { cashUpdate, cashUpdateTodo, concatCashTodo } = this.props;
    
    const title = this.titleInput.value;
    const text = this.textInput.value;
  
    cashUpdateTodo({
      id: cashUpdate.id, title: title, text: text
    });
    
    concatCashTodo();
    
    this.clearChangeTodo();
  }
  
  
  
  render() {
    const { todo, removeLastTodo, updateTodo } = this.props;
    const componentClassName = (done) => done ? 'status-done' : null;
    
    return(
      <div>
        <h3>Immutable JS Todo List</h3>
        
        <ul>
          { todo.map((elem) => {
            return <li key={ elem.id }
                       className={ componentClassName(elem.done) }>
              <span onClick={ () => this.doneUndone(elem.id) }>
                { elem.title } : { elem.text } {' '}
              </span>
              
              { elem.done ? <button onClick={ () => this.removeIndex(elem.id) }
                                    className='btn btn-danger'>Delete</button>
                : <button onClick={ () => this.updateListTodo(elem) }
                          className='btn btn-info'>Update</button>
              }
              
            </li>
          }) }
        </ul>
        
        <div className='col-md-6'>
          <input ref={ (input) => { this.titleInput = input; } }
                 type='text'
                 className='form-control'
                 placeholder='Enter title in this field'/>
          <input ref={ (input) => { this.textInput = input; } }
                 type='text'
                 className='form-control'
                 placeholder='Enter text in this field'/>
  
          { (updateTodo) ?
            <span>
              <button onClick={ () => this.updateChangeTodo() }
                      className='btn btn-info'>Save Changing</button>
              <button onClick={ () => this.clearChangeTodo() }
                      className='btn btn-warning'>Clear fields</button>
            </span>
            : <span>
              <button onClick={ this.createNewTodo }
                      className='btn btn-success'>Add New</button>
              <button onClick={ removeLastTodo }
                      className='btn btn-danger'>Remove Last</button>
            </span>
          }
        </div>
      </div>
    );
  }
}

ImmutableTodoList.defaultProps = {
  todo: [],
  updateTodo: false
};

ImmutableTodoList.propTypes = {
  // todo: PropTypes.array.isRequired,
  todo: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    todo: state.todoList.get('todo'),
    updateTodo: state.todoList.get('updateTodo'),
    cashUpdate: state.todoList.get('cashUpdate')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //newNotes: bindActionCreators(newNotes, dispatch)
    addNewTodo: (data) => dispatch({ type: 'ADD_NEW_TODO', data }),
    removeLastTodo: () => dispatch({ type: 'REMOVE_LAST_TODO' }),
    removeIndexTodo: (id) => dispatch({ type: 'REMOVE_INDEX_TODO', id }),
    doneTodo: (id) => dispatch({ type: 'DONE_TODO', id }),
    updateButtonTodo: (changeButton) => dispatch({ type: 'UPDATE_BUTTON_TODO', changeButton }),
    cashUpdateTodo: (data) => dispatch({ type: 'CASH_UPDATE_TODO', data }),
    cashClearTodo: () => dispatch({ type: 'CASH_CLEANER_TODO' }),
    concatCashTodo: () => dispatch({ type: 'CONCAT_CASH_TODO' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImmutableTodoList);
