import { useState, useEffect, useCallback } from 'react';
import { list } from '../../services/messages-service'
import ConversationItem from './ConversationItem';
import { Card, Segment, Container, Header, Icon } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';




function ConversationList() {

    const [conversations, setConversations] = useState([])
    const params = useParams()
    const history = useHistory()


    useEffect(() => {

        async function fetchConversations() {

            const conversations = await list()

            if (!isUnmounted) {
                setConversations(conversations)
            }
        }

        let isUnmounted = false;

        fetchConversations()
        return () => {
            // componentWillUnmount
            isUnmounted = true;
        }
    }
        , [params])

    return (


        <Container>

            <Header
                as='h2'
                icon
                textAlign='center'>
                <Icon
                    color='brown'
                    name='users'

                    circular />
                <Header.Content>Friends</Header.Content>
            </Header>

            {conversations?.length === 0 ?

                <Segment

                    textAlign='center'
                >

                    <h1>You are on date!!</h1>

                    <Icon
                        name="smile outline"
                        size='massive'
                        color='brown'
                        loading>

                    </Icon>
                </Segment>
                :

                <Card>
                    <div>
                        {conversations.map(conversation => (

                            <Segment className="mb-4" key={conversation.id}>

                                <ConversationItem

                                    conversation={conversation}
                                />

                            </Segment>
                        ))}
                    </div>
                </Card>
            }
        </Container>
    )


}

export default ConversationList

