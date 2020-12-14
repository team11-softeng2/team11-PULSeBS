import React, { Component } from 'react'
import { FaFileUpload, FaFileAlt } from "react-icons/fa";
import './Dropzone.css'

class Dropzone extends Component {

    constructor(props) {
        super(props);
        this.state = {
            highlight: false
        };

        this.fileInputRef = React.createRef();

        this.openFileDialog = this.openFileDialog.bind(this);
        this.onFileAdded = this.onFileAdded.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    openFileDialog() {
        if (this.props.disabled) return;
        this.fileInputRef.current.click();
    }

    onFileAdded(event) {
        if (this.props.disabled) return;
        if (event.target.files.length > 0) {
            const file = event.target.files[0];

            if (this.props.onFileAdded) {
                this.props.onFileAdded(file);
            }
        }
    }

    onDragOver(event) {
        event.preventDefault();
        if (this.props.disabled) return;
        this.setState({ hightlight: true });
    }

    onDragLeave(event) {
        this.setState({ hightlight: false });
    }

    onDrop(event) {
        event.preventDefault();
        if (this.props.disabled) return;
        if (event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            if (file.type === "text/csv") {
                if (this.props.onFileAdded) {
                    this.props.onFileAdded(file);
                }
            }
        }
        this.setState({ hightlight: false });
    }

    render() {
        return <>
            <div
                className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                style={{ cursor: this.props.disabled ? "default" : "pointer" }}
            >
                <input
                    ref={this.fileInputRef}
                    className="FileInput"
                    type="file"
                    accept=".csv"
                    onChange={this.onFileAdded}
                />
                {
                    this.props.file === undefined ?
                        <FaFileUpload className="UploadIcon my-3" />
                        :
                        <FaFileAlt className="FileIcon my-3" />
                }
                <span className="Filename">{this.props.file !== undefined ? this.props.file.name : "Choose a file"}</span>
            </div>
        </>
    }
}

export default Dropzone;