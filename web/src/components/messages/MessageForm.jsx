import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import { useContext } from 'react';
import {  useParams } from "react-router";

import { AuthContext } from '../contexts/AuthStore';
import { create } from "../../services/messages-service";




export const MessageForm = (IdGuide) => {



  const { user } = useContext(AuthContext);
  
  const params = useParams()

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
      <Row className=" mb-4">
        <Col  md={{ size: 6, offset: 3 }} className="text-center mb-4 mt-2">
          {user && <h4>Message from {user.userName}</h4>}
        </Col>
      </Row>
      {user &&
        <Row >
          <Col  md={{ size: 10, offset: 1 }}>

            <Form className="mt-4 mb-4">
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