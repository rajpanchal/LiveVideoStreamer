import React, { Component } from 'react';
import { connect } from 'react-redux';

import StreamForm from './StreamForm';
import { createStream } from '../../actions';

class StreamCreate extends Component {

  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  }

  render() {
    // console.log(`this.props: \n`, this.props);
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={ this.onSubmit } />
      </div>
    );
  }
};

export default connect(null, { createStream })(StreamCreate);