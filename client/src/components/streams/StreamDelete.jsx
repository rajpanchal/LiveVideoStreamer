import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../Modal';
import history from '../../history';
import { deleteStream, fetchStream } from '../../actions';

class StreamDelete extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchStream(id);
  }

  onDeleteClicked = () => {
    const stream = this.props.stream;
    if (stream) {
      this.props.deleteStream(stream.id);
    }
  }

  onDismiss = () => {
    history.push('/');
  }

  renderActions = () => {
    return (
      <React.Fragment>
        <button className="ui button negative" onClick={ this.onDeleteClicked }>Delete</button>
        <Link to="/" className="ui button" >Cancel</Link>
      </React.Fragment>
    );
  };
  
  renderContent = (stream) => {
    if (!stream) return `Are you sure you want to delete this stream ?`;

    return `Are you sure you want to delete stream with title: '${stream.title}' ?`;
  }

  render() {
    const { stream } = this.props;

    return (
      <div>
        <Modal title="Delete Stream" 
              content={ this.renderContent(stream) }
              actions={ this.renderActions() }
              onDismiss={ this.onDismiss }
              />
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

export default connect(mapStateToProps, { deleteStream, fetchStream })(StreamDelete);