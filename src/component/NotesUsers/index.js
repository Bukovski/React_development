import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { newNotes, delIndexNote, editIndexNote } from '../../actions'

import ListNote from './ListNote'
import FormNote from './FormNote'
import EditNote from './EditNote'

import {NOTES_LENGHT_INPUT, NOTES_LENGHT_TEXT} from '../../settings'

/*
 Дан текстареа и кнопка. В текстареа пользователь нашего сайта будет вводить свои заметки.
 После нажатия на кнопку введенный текст должен появится под текстареа в виде блока div.
 Таких заметок может быть много. В каждой заметке должен стоять заголовок
  (заметка1, заметка2 и так далее), время создания заметки (часы, минуты, секунды),
   а также должна быть кнопка 'удалить' и кнопка 'редактировать'.
 */
class NotesUsers extends Component {
  constructor() {
    super();
    this.state = {
      valueInput: '',
      valueText: '',
      validFormInput: '',
      validFormText: '',
  
      editInput: '',
      editText: '',
      validEditInput: '',
      validEditText: '',
      updateNoteId: null
    }
  }
  

  addNotes(event) {
    event.preventDefault();
    
    const { newNotes } = this.props;
    const { valueInput, valueText } = this.state;
    const validate = this.validateItem;

    const valInput = validate(valueInput, NOTES_LENGHT_INPUT);
    const valText = validate(valueText, NOTES_LENGHT_TEXT);
    
    this.setState({
      validFormInput: valInput,
      validFormText: valText,
    });
    
    if(!valInput.length && !valText.length) {
      newNotes(valueInput, valueText);
  
      this.setState({
        valueInput: '',
        valueText: '',
        validFormInput: '',
        validFormText: ''
      });
    }
  }
  
  editNotes(id) {
    const { editInput, editText } = this.state;
    const { editIndexNote } = this.props;
    const validate = this.validateItem;
  
    const valInput = validate(editInput, NOTES_LENGHT_INPUT);
    const valText = validate(editText, NOTES_LENGHT_TEXT);
  
    this.setState({
      validEditInput: valInput,
      validEditText: valText,
    });
  
    if(!valInput.length && !valText.length) {
      editIndexNote(id, editInput, editText);
  
      this.setState({
        editInput: '',
        editText: '',
        updateNoteId: null,
        validEditInput: '',
        validEditText: ''
      })
    }
  }
  
  validateItem(item, settings) {
    if (!item.length) {
      return `The field is empty`;
    }
    if (item.length < settings.min) {
      return `The minimum value should be ${settings.min}`;
    }
    if (item.length > settings.max) {
      return `The maximum value should be ${settings.max}`;
    }
    if (!/^[а-яёА-ЯЁ\w\s\-\%\@\,\.\!\?\;\:\(\)]+$/i.test(item)) {
      return `Enter text or numbers`;
    }
    return false;
  }
  
  render() {
    const { notes, delIndexNote } = this.props;
    const { valueInput, valueText, updateNoteId,
      editInput, editText, validFormInput, validFormText,
      validEditInput, validEditText } = this.state;
    
    const list = notes.map(elem => {
      return (updateNoteId && updateNoteId === elem.id)
        ? <EditNote key={ elem.id }
                    
                    editInput={ editInput }
                    editText={ editText }
                    
                    onChangeInput={ (event) => this.setState({ editInput: event }) }
                    onChangeText={ (event) => this.setState({ editText: event }) }

                    validEditInput={ validEditInput }
                    validEditText={ validEditText }
                    
                    saveEdit={ this.editNotes.bind(this, elem.id) }
        />
        :<ListNote key={ elem.id }
                       notes={ elem }
                   
                       deleteIndex={ () => delIndexNote(elem.id) }
                   
                       editIndex={ () => this.setState({
                         updateNoteId: elem.id,
                         editInput: elem.title,
                         editText: elem.text
                       }) }
      />
    });
    
    return(
      <div>
        <FormNote inputValue={ valueInput }
                  textValue={ valueText }
                  onChangeInput={ (event) => this.setState({valueInput: event}) }
                  onChangeText={ (event) => this.setState({valueText: event}) }
                  formGet={ this.addNotes.bind(this) }
                  validFormInput={ validFormInput }
                  validFormText={ validFormText }
        />
        
        { (notes.length) ? list : <p>No notes yet!</p> }
      </div>
    );
  }
}

NotesUsers.propTypes = {
  //reducer
  notes: PropTypes.array.isRequired,
  //action
  newNotes: PropTypes.func.isRequired,
  delIndexNote: PropTypes.func.isRequired,
  editIndexNote: PropTypes.func.isRequired
};

function mapStateToProps(state) {
   return {
    notes: state.notesUser.notes,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newNotes: bindActionCreators(newNotes, dispatch),
    delIndexNote: bindActionCreators(delIndexNote, dispatch),
    editIndexNote: bindActionCreators(editIndexNote, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesUsers);