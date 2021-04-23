
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
          const id = user?.id                           
          history.replace(`/users/${id}`)   
              }
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton  className="mb-2">
        Thank You  {user?.userName}
      </Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter"  className="ms-3">
        <i className="fa fa-thumbs-up me-3" aria-hidden="true" ></i>
          If your License is Ok we will confirm your apply before 24 hours.
            </Modal.Title>
        <Modal.Body>
       

      </Modal.Body>
      <Modal.Footer>
        <Button outline color="success" onClick={onClick}>Come on!!</Button>
      </Modal.Footer>
    </Modal>



  );
}

export default Acceptation;