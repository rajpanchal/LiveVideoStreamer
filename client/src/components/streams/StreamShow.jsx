import React, { Component } from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions/index';

const REACT_APP_RTMP_HOST_URL = process.env.REACT_APP_RTMP_HOST_URL;
console.log(`[info][StreamShow.jsx] - REACT_APP_RTMP_HOST_URL:${REACT_APP_RTMP_HOST_URL}`);

class StreamShow extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchStream(id);
    this.buildPlayer(id);
  }

  // Called when props are updated
  componentDidUpdate() {
    const id = this.props.match.params.id;
    this.buildPlayer(id);
  }

  // Right place to do cleanups
  componentWillUnmount() {
    this.player.destroy();
  }

  render() {
    if (!this.props.stream) return <div>Loading ...</div>;
    const { title, description } = this.props.stream;

    return (
      <div>
        <video ref={ this.videoRef } style={{ width: '100%' }} controls  />
        <div className="ui segment">
          <h1 className="ui header">{ title }</h1>
          <h5>{ description }</h5>
        </div>
      </div>
    );
  }

  buildPlayer = (id) => {
    // do nothing if player has been built OR stream is still not filed
    if (this.player || !this.props.stream) {
      return;
    }
    
    const streamPath = `/live/${id}.flv`;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `${REACT_APP_RTMP_HOST_URL}${streamPath}`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  
  }  
}

const mapStateToProps =  (state, ownProps) => {
  const id = ownProps.match && ownProps.match.params ? ownProps.match.params.id : null;

  return {
    stream: state.streams[id]
  };
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);