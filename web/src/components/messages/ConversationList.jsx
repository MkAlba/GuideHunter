import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthStore';


import { list } from '../../services/messages-service'
import ConversationItem from './ConversationItem';

function ConversationList() {

   

    const [conversations, setConversations] = useState([])

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

        , [])

    return (
        <div>
            { conversations.map(conversation => (
                <div key={conversation.id}
                >
                    
                    <ConversationItem

                        conversation = {conversation}
                    />
                </div>
            ))}
        </div>
    )


}

export default ConversationList