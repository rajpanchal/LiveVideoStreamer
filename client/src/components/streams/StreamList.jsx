import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';
import { isArray } from 'util';

class StreamList extends Component {
  componentDidMount() {
    const { fetchStreams } = this.props;
    fetchStreams();
  }

  renderDeleteEditButtons = (streamId, userId) => {
    const { currentUserId } = this.props;
    if (currentUserId === userId) {
      return (
        <div className="right floated content">
          <Link to={ `/streams/edit/${streamId}` } className="ui button primary">Edit</Link>
          <Link to={ `/streams/delete/${streamId}` } className="ui button negative">Delete</Link>
        </div>
      );
    }

    return null
  }

  renderList = (streams) => {
    if ( !isArray(streams)) {
      return <div>Loading ...</div>
    }

    const streamsList = streams.map(_stream => {
      const { id, title, description, userId } = _stream;
      return (
        <div key={ id } className="item">
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${id}`}>{ title }</Link>
            <div className="description">{ description }</div>
          </div>
          { this.renderDeleteEditButtons(id, userId) }
        </div>
      );
    });

    return streamsList;
  }

  /**
   * Only shown when a user is signed in
   */
  renderCreateLink(isSignedIn) {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button positive">Create</Link>
        </div>
      );
    }
    return null;
  }

  render() {
    const { streams, isSignedIn } = this.props;
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList(streams)}</div>
        { this.renderCreateLink(isSignedIn) }        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
}

export default connect(
  mapStateToProps, 
  { fetchStreams }
)(StreamList);