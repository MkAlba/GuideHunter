import { Link } from 'react-router-dom';
import { Card, Feed } from 'semantic-ui-react';
import { useHistory } from 'react-router';
const moment = require('moment');


function ConversationItem({ conversation }) {
  
  const history = useHistory();


  const channel = (Object.values(conversation))
  const message = conversation.messages

  const conversationsAsGuide = Object.values(message).filter(message => (message.user.id === channel[0]) && (message.read_check = 'false'))

  conversationsAsGuide.sort((a, b) => {
    let da = new Date(a.createdAt),
      db = new Date(b.createdAt);
    return db - da;
  });

  console.log(conversationsAsGuide)



  const conversationAsUser = Object.values(message).filter(message => (message.user.id != channel[0] && (message.read_check = 'false')))

  conversationAsUser.sort((a, b) => {
    let da = new Date(a.createdAt),
      db = new Date(b.createdAt);
    return db - da;
  });

  console.log(conversationAsUser)


  return (

    <div>

      <h1>Conversations as Guide    </h1>



      <div>

        {conversationsAsGuide[0] &&

        <Link to={{
          pathname:"/messages/:id",
          state: conversationsAsGuide
        }}>
          <Card>
            <Card.Content>
              <Card.Header >Conversation with {conversationsAsGuide[0].user.userName} </Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                <Feed.Event>
                  <Feed.Label image={conversationsAsGuide[0].user.avatar} />
                  <Feed.Content>
                    <Feed.Date content={moment(conversationsAsGuide[0].createdAt).startOf('hour').fromNow()} />
                    <Feed.Summary>
                      {conversationsAsGuide[0].message}
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>

                
              </Feed>
            </Card.Content>
          </Card>
          
          </Link>}
      </div>





      <h1>Conversations as User    </h1>
      {conversationAsUser[0] &&
        <Card>
          <Card.Content>
            <Card.Header >Conversation with {conversationAsUser[0].user.userName} </Card.Header>
          </Card.Content>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Label image={conversationAsUser[0].user.avatar} />
                <Feed.Content>
                  <Feed.Date content={moment(conversationAsUser[0].createdAt).startOf('hour').fromNow()} />
                  <Feed.Summary>
                    {conversationAsUser[0].message}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>


            </Feed>
          </Card.Content>
        </Card>

      }

    </div>


  )
}


export default ConversationItem;
