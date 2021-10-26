import React, { Component } from 'react';
import AudioVisualiserBar from './AudioVisualizeBar';

class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.state = { audioData: new Uint8Array(0) };
    this.tick = this.tick.bind(this);
    this.count = 0;
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 128;
    this.analyser.minDecibels = -90;
    this.analyser.maxDecibels = -10;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);
    this.rafId = requestAnimationFrame(this.tick);
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.count+=1
    if(this.count%20==0){
      this.count = 0;
      this.setState({ audioData: this.dataArray });
    }
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  render() {
    return <AudioVisualiserBar audioData={this.state.audioData} bufferLength={this.bufferLength} />;
  }
}

export default AudioAnalyser;
