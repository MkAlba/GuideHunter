import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthStore';

import Section from './../../components/section/section';





function MessageItem(props) {

  const { user } = useContext(AuthContext);
const  conversation = Object.values(props) 

const id = conversation[0]
console.log(id)
  
  
  return (
                            
   
            
    <div>


      <h1>333     </h1>

            

              <h4 className="name"> 
            
                </h4>
             
 
                </div>        
        
      
  )
}


export default MessageItem;
