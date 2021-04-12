import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../components/contexts/AuthStore';


import { list } from '../../services/messages-service'
import MessageItem from './MessageItem';

function MessageList() {

    const { user, isAuthenticated } = useContext(AuthContext)

    const [state, setState] = useState( [] )

    useEffect(() => {

        const id = user.id;
        async function fetchConversations() {


            const conversationStringfy = await list()

            const conversation2 = JSON.parse(conversationStringfy)
            console.log(conversation2)

            const conversations = []
            Object.keys(conversation2).forEach(key => conversations.push({ name: key, value: conversation2[key] }))
            console.log(conversations)






            /* console.log(conversationsReceived)
             const conversationsConverted = JSON.parse(conversationsReceived)
             console.log(conversationsConverted)
             const conversations2 = Object.values(conversationsConverted)           
             const conversations = Object.values(conversations2)
             console.log(conversations)*/


            if (!isUnmounted) {
                setState({
                    conversations: conversations
                })
            }

            setState(conversations)

        }

        let isUnmounted = false;

        fetchConversations()
        return () => {
            // componentWillUnmount
            isUnmounted = true;
        }

    }

        , [])


    const  {conversations}  = state
    console.log(conversations)





    return (
        <div>
            { conversations && conversations.map(conversation => (
                <div key={conversation.id}
                >
aaaaa
                  <MessageItem  
                  {...conversation}
                    />
                </div>
            ))}
        </div>
    )


}

export default MessageList