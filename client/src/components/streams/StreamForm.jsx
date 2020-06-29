import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
  onSubmit = (formValues) =>{
    const {onSubmit} = this.props;
    if (onSubmit) {
      onSubmit(formValues);
    }
  }

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header"> { error } </div>
        </div>
      );
    }
  }
  
  renderInput = ({ input, label, meta }) => {
    // console.log(`formProps: \n`, formProps);;
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={ className }>
        <label>{ label }</label>
        <input {...input} autoComplete="off"/>
        { this.renderError(meta) }
      </div>
    );
  }

  render(){
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui error form">
        <Field name="title" component={ this.renderInput } label="Enter title: " />
        <Field name="description" component={ this.renderInput } label="Enter description: " />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = ({ title, description }) => {
  const errors = {};
  if (!title) {
    errors.title = 'You must enter a title.';
  }

  if (!description) {
    errors.description = 'You must enter a description';
  }

  return errors; // return empty if all values are Ok.
}

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);
