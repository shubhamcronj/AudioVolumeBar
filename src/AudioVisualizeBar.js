import React, { Component } from 'react';

class AudioVisualiserBar extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.bar = React.createRef();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const { audioData, bufferLength } = this.props;
    var sum  = 0;
    for(var i = 0; i < bufferLength; i++) {
        sum += Math.abs((128-audioData[i]))*10;
    }
    this.average = (sum/bufferLength);

    this.progressWidth = {
      width: 30*Math.log(this.average)-40,
      backgroundColor: `rgba(${30*Math.log(this.average)},${255-30*Math.log(this.average)}, 0)`,
    }
  }

  render() {
    return <div>
                <div className="volume" style={this.progressWidth}></div>
            </div>;
  }
}

export default AudioVisualiserBar;
