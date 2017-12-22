import React, { Component } from 'react';
import PropTypes from 'prop-types';


class AddNewWorker extends Component {
  constructor() {
    super();
    this.state = {
      valueForm: {},
  
      selectItem: ['male', 'female'],
      selectId: 'male'
    };
  
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  };
  
  componentDidMount() {
    for (let name in this.refs) {
      this.refs[name].onkeypress = (e) =>
        this._handleKeyPress(e, this.refs[name]);
    }
    this.refs.firstName.focus();
  }
  
  _handleKeyPress(e, field) {
    // If enter key is pressed, focus next input field.
    if (e.keyCode === 13) {
      e.preventDefault();
      let next = this.refs[field.name].nextSibling;
      if (next && (next.tagName === "INPUT" || next.tagName === "SELECT")) {
        this.refs[field.name].nextSibling.focus();
      }
    }
  }
  
  
  //add new note
  handleChangeForm(event) { //all setState and input value
    let name = event.target.name;
    let valueForm = Object.assign({}, this.state.valueForm);
    
    valueForm[name] = event.target.value;
    
    this.setState({ valueForm });
  }
  
  handleSubmitForm(event) { //to save data from the form
    event.preventDefault();
    
    const { valueForm } = this.state;
    const { createNewWorker } = this.props;
  
    createNewWorker({ valueForm });
  
    this.setState({ valueForm: {} }); //cleared state
    
    for (let name in this.refs) { //cleared input value through refs
      this.refs[name].value = ''
    }
  }
  
  render() {
    const { selectItem } = this.state;
    
    return(
      <form onSubmit={ this.handleSubmitForm } onChange={ this.handleChangeForm }>
        <div className="form-inline">
          <input name="firstName" ref='firstName'
                 type="text" className="form-control"
                 title="First Name" placeholder="Enter first name"
                 pattern="[а-яёА-ЯЁ\w]{3,40}" required
          />
          <input name="lastName" ref='lastName'
                 type="text" className="form-control"
                 title="Last Name" placeholder="Enter last name"
                 pattern="[а-яёА-ЯЁ\w]{3,40}" required
          />
          <input name="salary" ref='salary'
                 type="number" className="form-control"
                 title="Salary" placeholder="Enter salary"
                 pattern="[0-9\.]{1,9}" required
          />
    
          <select name="gender"
                  className="form-control">
            { selectItem.map(elem => {
              return <option key={elem} value={ elem }>{ elem }</option>
            }) }
          </select>
    
          <button type="submit" className="btn btn-primary">Add new worker</button>
          
        </div>
      </form>
    );
  }
}


AddNewWorker.propTypes = {
  createNewWorker: PropTypes.func.isRequired
};


export default AddNewWorker
