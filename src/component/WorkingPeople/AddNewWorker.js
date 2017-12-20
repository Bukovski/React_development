import React, { Component } from 'react';
import PropTypes from 'prop-types';


class AddNewWorker extends Component {
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
  
  render() {
    const {valueFirstName, valueLastName, valueSalary,
      onChangeFirstName, onChangeLastName, onChangeSalary,
      addWorkerSubmit, selectItem, selectValue, selectChange,
    } = this.props;
    
    return(
      <form onSubmit={ addWorkerSubmit }>
        <div className="form-inline">
          <input type="text" value={ valueFirstName }
                 name="firstName" ref='firstName'
                 onChange={ (event) => onChangeFirstName(event.target.value) }
                 title="First Name"
                 className="form-control" placeholder="Enter first name"
                 pattern="[а-яёА-ЯЁ\w]{3,40}" required
          />
          <input type="text" value={ valueLastName }
                 name="lastName" ref='lastName'
                 onChange={ (event) => onChangeLastName(event.target.value) }
                 title="Last Name"
                 className="form-control" placeholder="Enter last name"
                 pattern="[а-яёА-ЯЁ\w]{3,40}" required
          />
          <input type="number" value={ valueSalary }
                 name="salary" ref='salary'
                 onChange={ (event) => onChangeSalary(event.target.value) }
                 title="Salary"
                 className="form-control" placeholder="Enter salary"
                 pattern="[0-9\.]{1,9}" required
          />
    
          <select className="form-control"
                  name="select" ref='select'
                  value={ selectValue } onChange={ selectChange }>
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
  valueFirstName: PropTypes.string.isRequired,
  valueLastName: PropTypes.string.isRequired,
  valueSalary: PropTypes.string.isRequired,
  onChangeFirstName: PropTypes.func.isRequired,
  onChangeLastName: PropTypes.func.isRequired,
  onChangeSalary: PropTypes.func.isRequired,
  addWorkerSubmit: PropTypes.func.isRequired,
  selectItem: PropTypes.array.isRequired,
  selectValue: PropTypes.string.isRequired,
  selectChange: PropTypes.func.isRequired
};


export default AddNewWorker
