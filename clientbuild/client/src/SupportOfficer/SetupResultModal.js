import React from "react";
import { Modal, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SetupResultModal extends React.Component {
  render(){
    return <Modal show={this.props.show}>
        <Modal.Body>
          {this.props.res && <Alert variant='success'>Setup successful!</Alert>}
          {!this.props.res && <Alert variant='danger'>
                                <p>Error during setup. Please check:</p>
                                <p>- if your files contain any error</p>
                                <p>- that you inserted each of them in the correct 'step' of the process</p>
                              </Alert>}
        </Modal.Body>

        <Modal.Footer>
          <Link to='/support-officer'>
            <Button>Go back</Button>
          </Link>
        </Modal.Footer>
      </Modal>
  }
}

export default SetupResultModal;
