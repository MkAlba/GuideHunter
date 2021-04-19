import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Feed, Icon } from 'semantic-ui-react';
import { useParams } from "react-router";
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthStore';


import ConversationModal from './ConversationModal';

const moment = require('moment');


function ConversationItem({ conversation }) {

  const params = useParams();
  const { user } = useContext(AuthContext);


  const channel = Object.values(conversation)

  const userConversation = channel[1]


  const messages = channel[2]

  let messagesSomeToRead = messages.some(message => !message.read_check)

  let messagesRead = messages.filter(message => message.read_check === true)

  messages.sort((a, b) => {
    let da = new Date(a.createdAt),
      db = new Date(b.createdAt);
    return db - da;
  })

  return (

    <div>

      {channel &&

        <div key={conversation.id}>

          <Card>

            <Card.Content>
              <Card.Header >Conversation with {userConversation.userName || (userConversation.name && userConversation.surname)} </Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                <Feed.Event>
                  <Feed.Label image={userConversation.avatar} />

                  {(messagesSomeToRead && messages[0].user.id != user.id) &&


                    <Icon name="envelope outline" size="big" />
                  }


                  {messagesSomeToRead && messages[0].user.id != user.id? <Feed.Content> You have messages to read
                      <Feed.Date content={moment(messages[0].createdAt).startOf('hour').fromNow()} className="mt-0 mb-3" />

                  </Feed.Content> : <p>All messages readed!</p>}
                </Feed.Event>
                <>

                  <Feed.Content> Old messages    </Feed.Content>
               

                  {messagesRead.map(message => (
                    <div className="mt-1 " key={message.id}>
                      {message.message}
                    </div>

                  ))}

                </>

              </Feed>
            </Card.Content>

            <ConversationModal
              userConversation={userConversation}
              messages={messages}
            />
          </Card>

        </div>

      }
    </div>
  )

}

export default ConversationItem;



