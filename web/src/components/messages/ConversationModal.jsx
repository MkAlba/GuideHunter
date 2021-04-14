import { map } from 'lodash'
import React from 'react'
import { useContext } from 'react'
import { Button, Icon, Comment, Image, Modal, Form, Header } from 'semantic-ui-react'
import { AuthContext } from '../contexts/AuthStore';
import { MessageForm } from './MessageForm';

const moment = require('moment');


function ConversationModal({ messages, userConversation }) {

  const [open, setOpen] = React.useState(false)
  const { user } = useContext(AuthContext);

  console.log(messages)
  console.log(userConversation.id)
  console.log(user)





  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>Conversation</Button>}
    >
      <Modal.Header>Profile Picture</Modal.Header>
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
                    <p>{message.message}</p>
                  </Comment.Text>                  
                </Comment.Content>

              </Comment>


            ))}

            <MessageForm 
            
            guideId = {userConversation.id} />

          </Comment.Group>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} primary>
          Back to conervastions <Icon name='chevron right' />
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ConversationModal
