import React from 'react';


const FormNote = ({ inputValue, textValue, onChangeInput, onChangeText, formGet, validFormInput, validFormText }) => (
  <form onSubmit={ formGet }>
    <div className={`form-group ${(validFormInput.length) ? 'has-error' : ''}` }>
      <label htmlFor="title">Title:</label>
      { (validFormInput.length) ? <label className="control-label text-error" htmlFor="text" >{ validFormInput }</label> : ''}
      <input type="text" value={ inputValue } onChange={ (event) => onChangeInput(event.target.value) }
             className="form-control" id="title" placeholder="Enter title" required/>
    </div>

    <div className={`form-group ${(validFormText.length) ? 'has-error' : ''}` }>
      <label htmlFor="text">Text:</label>
        { (validFormText.length) ? <label className="control-label text-error" htmlFor="text" >{ validFormText }</label> : ''}
      <textarea value={ textValue } onChange={ (event) => onChangeText(event.target.value) }
              className="form-control" id="text" placeholder="Enter text" required/>
    </div>
    <br/>
    <button className='btn btn-success'>Add notes</button>
  </form>
);

export default FormNote;
