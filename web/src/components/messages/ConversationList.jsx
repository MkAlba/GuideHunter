import { useState, useEffect } from 'react';
import { list } from '../../services/messages-service'
import ConversationItem from './ConversationItem';
import { Card, Grid } from 'semantic-ui-react';
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
        , [params, history])




    return (
        <Grid className=" mt-4" container columns={3}>
            <Card>
                <div>
                    {conversations.map(conversation => (

                        <Grid.Column className="mb-4" key={conversation.id}>

                            <ConversationItem

                                conversation={conversation}
                            />

                        </Grid.Column>
                    ))}
                </div>
            </Card>
        </Grid>

    )


}

export default ConversationList