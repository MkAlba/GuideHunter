import { useState,  useContext } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../components/contexts/AuthStore';
import moment from 'moment';

function ConversationDetail() {       
    const location = useLocation();
    const { user } = useContext(AuthContext);  
    const [state, setState] = useState({conversation: location.state || ''})
  
    console.log(state)
  
    

    return (
      <>
        <h1>111111</h1>
      </>
    );
  }
  
  export default ConversationDetail;
  