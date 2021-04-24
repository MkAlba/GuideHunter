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
      <Row >
        <Col  className="mt-4 mb-2 text-center">
          {user && <h4>Any Message?</h4>}
        </Col>
      </Row>
      {user &&
        <Row >
          <Col  md={{ size: 10, offset: 1 }}>

            <Form className=" text-center mt-2 mb-4">
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
              <Button className=" mt-4 mb-4 outline-secondary " onClick={sendMessage}>Send Message</Button>
              
            </Form>
          </Col>
        </Row>}
    </div>
  );
};