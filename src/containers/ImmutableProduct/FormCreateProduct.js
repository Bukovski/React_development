import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {};

  function validString(values, nameField) {
    if (!/^[а-яёА-ЯЁ\w\s\-]+$/i.test(values[nameField])) {
      errors[nameField] = 'Enter text or numbers';
    } else if (!values[nameField]) {
      errors[nameField] = 'Required'
    } else if (values[nameField].length < 5) {
      errors[nameField] = 'Must be 5 characters or less'
    } else if (values[nameField][0] !== values[nameField][0].toUpperCase()) {
      errors[nameField] = 'The first letter should be upper case'
    }
  }
  function validNumber(values, nameField) {
    if (!values[nameField]) {
      errors[nameField] = 'Required'
    } else if (isNaN(Number(values[nameField]))) {
      errors[nameField] = 'Must be a number'
    }
    return errors
  }

  validString(values, 'title');
  validNumber(values, 'price');
  validNumber(values, 'count');
  return errors
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={ `form-group ${ touched && error ? 'has-error' : '' }` }>
    <label>{ label }</label>
    <div>
      <input {...input} placeholder={ label } type={ type } className="form-control"/>
      { touched && (error && <span className="text-danger">{ error }</span>) }
    </div>
  </div>
);

const FormCreateProduct = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  
  return (
    <form onSubmit={handleSubmit} >
      <Field name="title" type="text" component={ renderField } label="Title"/>
      <Field name="price" type="number" component={ renderField } label="Price"/>
      <Field name="count" type="number" component={ renderField } label="Count"/>
      <div>
        <button type="submit" disabled={ submitting } className='btn btn-success'>Submit</button>
        <button type="button"
                disabled={ pristine || submitting }
                onClick={ reset }
                className='btn btn-info'>Clear Values</button>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'formProduct',
  validate
})(FormCreateProduct)