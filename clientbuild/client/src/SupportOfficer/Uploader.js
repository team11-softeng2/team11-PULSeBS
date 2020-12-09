import React, { useState, Component } from 'react'
import Dropzone from "./Dropzone"

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileType: null,
      successfullUploaded: false
    };

    this.onFileAdded = this.onFileAdded.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onFileAdded(file) {
    this.setState({
      file: file
    });
  }

  render() {
    return (<>
                <Dropzone
                  onFileAdded={this.onFileAdded}
                  disabled={false}
                  file={this.state.file}
                />
    </>
    );
  }

  handleChange(event) {
    this.setState({ fileType: event.target.value });
  }

}

export default Uploader;