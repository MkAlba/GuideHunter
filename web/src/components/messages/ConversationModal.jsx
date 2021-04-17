import React from 'react'
import { useContext } from 'react'
import { Button, Icon, Comment, Image, Modal, Header, Divider } from 'semantic-ui-react'
import { AuthContext } from '../contexts/AuthStore';
import { MessageForm } from './MessageForm';
import { Link, useLocation } from 'react-router-dom';

const moment = require('moment');


function ConversationModal({ messages, userConversation }) {

  const [open, setOpen] = React.useState(false)
  const { user } = useContext(AuthContext);

  const location = useLocation(); 
  console.log(location)

  
  return (
    <Modal
      open={open}
      
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button
      >Conversation</Button>}
      
    >
      <Modal.Header
      centered>Profile Picture</Modal.Header>
      <Modal.Content image scrolling>
        <Image size='medium' src={userConversation.avatar} wrapped />

        <Modal.Description>
          <Comment.Group>
            <Header as='h3' dividing>
              Conversation with {userConversation.userName || (userConversation.name && userConversation.surname)}
            </Header>

            {messages.map(message => (
              <Comment>
                <Comment.Avatar src={userConversation.avatar} />
                <Comment.Content>

                  {message.user.id === user.id
                    ? <Comment.Author as='a'>{user.name || user.userName}</Comment.Author>
                    : <Comment.Author as='a'>{message.user.name || message.user.userName}</Comment.Author>}



                  <Comment.Metadata>
                    <div>{moment(message.createdAt).startOf('hour').fromNow()}</div>
                  </Comment.Metadata>
                  <Comment.Text>
                    <p className= "mt-2">{message.message}</p>
                  </Comment.Text>                  
                </Comment.Content>

              </Comment>


            ))}
   <Divider className= "mt-3"
        horizontal>
      <Header as='h4'>
        <Icon className= "mt-4" name='comments' />
        Something to ask?
      </Header>
    </Divider>
   
            <MessageForm 
            
            
            id = {userConversation.id} />
            

          </Comment.Group>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        
        <Link to="/messages">
        <Button onClick={() => setOpen(false)} primary>
          Back to conversations <Icon name='chevron right' />
        </Button>
        </Link>
      </Modal.Actions>
    </Modal>
  )
}

export default ConversationModal
