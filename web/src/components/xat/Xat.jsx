import { Widget, addResponseMessage} from 'react-chat-widget'   //addLinkSnippet, addUserMessage 
import 'react-chat-widget/lib/styles.css';
//import { create } from '../../services/messages-service';
import logo from '../../images/LogoColorCortado.jpg';
import {Component} from 'react';
import './xat.css'

class Xat extends Component {
  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API         
  }

  render() {
    return (
      <div className="conversation-container">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={logo}
          
          title="GuideHunter"
          subtitle="How can we help you?"
        />
      </div>
    );
  } 
}

export default Xat;