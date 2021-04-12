
import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from "reactstrap";
import { useHistory } from "react-router"; 
import { AuthContext } from '../../contexts/AuthStore';



function Acceptation(props) {
    const history = useHistory()    
    const { user } = useContext(AuthContext)
 
   
  

  
      async function onClick(e) {
        e.preventDefault()
        const id = user.id                           
          history.replace(`/users/${id}`)   
              }
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thank You!!!!
            </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClick}>Close</Button>
      </Modal.Footer>
    </Modal>



  );
}

export default Acceptation;