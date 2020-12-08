import React, { useState, Component } from 'react'
import './Uploader.css'
import { FaFileUpload, FaFileAlt } from "react-icons/fa";

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false
    };

    this.onFileAdded = this.onFileAdded.bind(this);
  }

  onFileAdded(file) {
    this.setState({
      file: file
    });
  }

  render() {
    return (
      <div className="Upload">
        <span className="Title">Upload File</span>
        <div className="Content">
          <div>
            <Dropzone
              onFileAdded={this.onFileAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
              file={this.state.file}
            />
          </div>
          <div className="File my-auto">
            <span className="Filename">{this.state.file !== null ? this.state.file.name : ""}</span>
          </div>
        </div>
        <div className="Actions">
          {this.renderActions()}
        </div>
      </div>
    );
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ file: null, successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.file === null || this.state.uploading}
          onClick={this.uploadFile}
        >
          Upload
        </button>
      );
    }
  }

}


const Dropzone = (props) => {

  const [hightlight, setHightlight] = useState(false);
  let fileInputRef = React.createRef();

  const openFileDialog = () => {
    if (props.disabled) return;
    fileInputRef.current.click();
  }

  const onFileAdded = (event) => {
    if (props.disabled) return;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      if (props.onFileAdded) {
        props.onFileAdded(file);
      }
    }
  }

  const onDragOver = (event) => {
    event.preventDefault();
    if (props.disabed) return;
    setHightlight(true);
  }

  const onDragLeave = (event) => {
    setHightlight(false);
  }

  const onDrop = (event) => {
    event.preventDefault();
    if (props.disabed) return;
    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file.type === "text/csv") {
        if (props.onFileAdded) {
          props.onFileAdded(file);
        }
      }
    }
    setHightlight(false);
  }

  return <>
    <div
      className={`Dropzone ${hightlight ? "Highlight" : ""}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      style={{ cursor: props.disabled ? "default" : "pointer" }}
    >
      <input
        ref={fileInputRef}
        className="FileInput"
        type="file"
        accept=".csv"
        onChange={onFileAdded}
      />
      {
        props.file === null ? 
        <FaFileUpload className="UploadIcon my-3" />
        :
        <FaFileAlt className="FileIcon my-3" />
      }
      <span className="Filename">{ props.file !== null ? props.file.name : "Upload File" }</span>
    </div>
  </>
}

export default Uploader;