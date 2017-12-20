import React from 'react';


const ListNote = ({ notes, deleteIndex, editIndex }) => (
  <div>
    <h3>{ notes.title }</h3>
    <p>{ notes.text }</p>
    <strong>{ notes.times }</strong>
    <br/>
    <button onClick={ deleteIndex } className='btn btn-danger'>Delete</button>
    <button onClick={ editIndex } className='btn btn-info'>Edit</button>
  </div>
);

export default ListNote;
