import React from 'react';


const EditNote = ({ editInput, editText, onChangeInput, onChangeText, saveEdit, validEditInput, validEditText }) => (
  <div>
    <br/>
    <div className={`form-group ${(validEditInput.length) ? 'has-error' : ''}` }>
        <label htmlFor="title">Title:</label>
      { (validEditInput.length) ? <label className="control-label text-error" htmlFor="text" >{ validEditInput }</label> : ''}
        <input type="text" value={ editInput } onChange={ (event) => onChangeInput(event.target.value) }
               className="form-control" id="title" placeholder="Enter title" required/>
    </div>
  
    <div className={`form-group ${(validEditText.length) ? 'has-error' : ''}` }>
        <label htmlFor="text">Text:</label>
      { (validEditText.length) ? <label className="control-label text-error" htmlFor="text" >{ validEditText }</label> : ''}
        <input value={ editText } onChange={ (event) => onChangeText(event.target.value) }
                  className="form-control" id="text" placeholder="Enter text" required/>
    </div>
  
    <button onClick={ saveEdit } className='btn btn-info'>Save</button>
  </div>
);

export default EditNote;
