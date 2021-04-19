import {React, useEffect, useState} from 'react'
import { useContext } from 'react'
import { Button, Icon, Feed, Image, Modal, Header, Divider } from 'semantic-ui-react'
import { AuthContext } from '../contexts/AuthStore';
import { MessageForm } from './MessageForm';
import { Link, useHistory } from 'react-router-dom';
import {update} from '../../services/messages-service'

const moment = require('moment');


function ConversationModal({ messages, userConversation }) {

  const [open, setOpen] = useState(false)
  const { user  } = useContext(AuthContext);
  console.log(user)
  const history = useHistory()

  const [messageToRead, setMessageToRead] = useState([])

  let messagesToRead = messages.filter(message => message.read_check === false)

  let messagesRead = messages.filter(message => message.read_check === true)
  console.log(messagesToRead)



  useEffect(() => {
    //component didmount
    
    console.log(messagesToRead.id)
    
    if (user.id = messagesToRead.id ) { 
    async function readMessages() {

      try {       

         await messagesToRead.map(message => (
      console.log(message),
          update(message)))

        if (!isUnmounted) {

          setMessageToRead(messageToRead);
        }
      } catch (error) {

        if (!isUnmounted) {

          if (error?.response?.status === 404) {
            history.push('/messages');
          } else {
            console.error(error)
          }
        }
      }
    }



    let isUnmounted = false;
    readMessages();

    return () => {
      //la función que retorna es el component WillUnmount
      isUnmounted = true;
    }}
  }, [])



  return (
    <Modal
      open={open}
      
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button
        basic color='black'
      >Conversation
      </Button>}
    >
      <Modal.Header
        >Profile Picture</Modal.Header>
      <Modal.Content image scrolling>
        <Image size='small' src={userConversation.avatar} wrapped />

        <Modal.Description>
          <Header as='h3' dividing>
            Conversation with {userConversation.userName || (userConversation.name && userConversation.surname)}
          </Header>
          <Feed>


            {messages.map(message => (
              <Feed>
                <Feed.Event>

                  {message.user.id === user.id


                    ? <Feed.Label as='a'> <img src={user.avatar} /></Feed.Label>
                    : <Feed.Label as='a'> <img src={message.user.avatar} /></Feed.Label>}

                  <Feed.Content>

                    <Feed.Summary
                      date={<div>{moment(message.createdAt).startOf('hour').fromNow()}</div>}


                      user={message.user.id === user.id
                        ? <Feed.User as='a'>{user.name || user.userName}</Feed.User>
                        : <Feed.User as='a'>{message.user.name || message.user.userName}</Feed.User>}


                      content={<p className="mt-2">{message.message}</p>}
                    />

                  </Feed.Content>
                </Feed.Event>
              </Feed>


            ))}
            <Divider className="mt-1"
              horizontal>
              <Header as='h4'>
                <Icon className="mt-1" name='comments' />
        Something to ask?
      </Header>
            </Divider>

            <MessageForm


              id={userConversation.id} />


          </Feed>
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
