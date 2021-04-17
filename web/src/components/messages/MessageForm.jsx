import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import { useContext } from 'react';
import {  useParams } from "react-router";

import { AuthContext } from '../contexts/AuthStore';
import { create } from "../../services/messages-service";




export const MessageForm = (IdGuide) => {



  const { user } = useContext(AuthContext);
  
  const params = useParams()

  console.log(params)
  console.log(IdGuide)
  console.log(IdGuide.id)

  const initialInputState = { message: "" };

  const [newMessage, setNewMessage] = useState(initialInputState);
  const { message } = newMessage;


  const handleInputChange = e => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  };


  const sendMessage = e => {

    let guideId = ''

    if (IdGuide.id !== undefined) {
      guideId = IdGuide
    }
    else guideId = params


    create(newMessage, user, guideId)
      .then(res => {
        setNewMessage(initialInputState);
      });
  };

  return (
    <div>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center mt-2">
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
                  style={{ 
                    
                    height: 150 }}
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