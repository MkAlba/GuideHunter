import { useState, useContext, useEffect } from 'react';
import { list } from '../../services/messages-service'
import ConversationItem from './ConversationItem';

function ConversationList() {



    const [conversations, setConversations] = useState([])

    useEffect(() => {


        async function fetchConversations() {


            const conversations = await list()

            console.log(conversations)
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

        , [])

    return (
        <div>
            { conversations.map(conversation => (
                <div key={conversation.id}
                >

                    <ConversationItem

                        conversation={conversation}
                    />
                </div>
            ))}
        </div>
    )


}

export default ConversationList