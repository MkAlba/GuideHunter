import { useState,  useContext, useEffect, } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../components/contexts/AuthStore';
import moment from 'moment';

function ConversationDetail() {       
    const location = useLocation();
    const { user } = useContext(AuthContext);  
    const [conversation, setConversation] = useState({conversation: location.state || []})
  
   

    return (
      <>
        <h1>111111</h1>
      </>
    );
  }
  
  export default ConversationDetail;
  