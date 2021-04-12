import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import { useContext } from 'react';
import { useHistory, useParams } from "react-router";

import { AuthContext } from '../contexts/AuthStore';
import { create } from "../../services/messages-service";




export const MessageForm = () => {



  const { user } = useContext(AuthContext);
  const history = useHistory();
  const params = useParams()


  const initialInputState = { message: "" };

  const [newMessage, setNewMessage] = useState(initialInputState);
  const { message } = newMessage;
 



  const handleInputChange = e => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  };

  
  const sendMessage = e => { 
    
    const guideId = params
    const userId = user.id
   
   create(newMessage, user, guideId )
   .then(res => {     
     setNewMessage(initialInputState);
       });
  };



    return (
    <div>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center mt-4">
          {user && <h4>Message from {user.userName}</h4>}
        </Col>
      </Row>
      {user && 
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          
        
          <Form>
            
            <FormGroup>              
              <Input
                type="textarea"
                value={message}
                onChange={handleInputChange}
                style={{ height: 150 }}
                name="message"
                placeholder="What's on your mind?"
              ></Input>
            </FormGroup>
            <Button onClick={sendMessage}>Submit</Button>
          </Form>
        </Col>
      </Row>}
    </div>
  );
};