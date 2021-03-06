import React, { Component } from 'react';

class AudioVisualiser extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.bar = React.createRef();
  }

  componentDidUpdate() {
    console.log("Draw")
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

    // this.volumeCircle = {
    //   width: 60*Math.log(this.average)-40,
    //   height: 60*Math.log(this.average)-40,
    //   backgroundColor: `rgba(${30*Math.log(this.average)},${255-30*Math.log(this.average)}, 0)`,
    //   // top: 600 - ((30*Math.log(this.average)-40)/2),
    //   // left: 600 - ((30*Math.log(this.average)-40)/2)
    // }

  }


  render() {
    return <div>{this.average} 
                <br/> 
                {30*Math.log(this.average)}
                <div className="volume" style={this.progressWidth}></div>
                {/* <div className='vc'>
                  <div className="volumeCircle" style={this.volumeCircle}></div>
                </div> */}
            </div>;
  }
}

export default AudioVisualiser;
