import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editStream, fetchStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends Component {
  componentDidMount() {
    const id = this.props.match && this.props.match.params ? this.props.match.params.id : null;
    if (id) {
      this.props.fetchStream(id);
    } 
  }

  onSubmit = (formValues) => {
    // console.log(`<StreamEdit.onSubmit> formValues: \n`, formValues);
    const { title, description } = formValues;
    this.props.editStream(this.props.stream.id, title, description );
  }

  
  render() {
    const { stream } = this.props;
    if (!stream) {
      return <div>Loading ...</div>
    }
     
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm initialValues={ _.pick(stream, 'title', 'description') } 
                    onSubmit={ this.onSubmit } />
      </div>
    );
  }
}

const mapStateToProps =  (state, ownProps) => {
  const id = ownProps.match && ownProps.match.params ? ownProps.match.params.id : null;

  return {
    stream: state.streams[id]
  };
}

export default connect(mapStateToProps, { editStream, fetchStream })(StreamEdit);