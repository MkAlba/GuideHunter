import React from 'react';
import { 
  Container,  
  Grid,
  Header, 
  List,  
  Segment,  
} from 'semantic-ui-react'
import '../footer/Footer.css'
 

function Footer({children}) {
    

    return(
   
    <Container 
       
      width= {100}
      position="absolute"
      bottom = '0'
     
      >
        <Segment inverted 
                vertical
               
                fixed="bottom"
        
        
        style={{ 
          
           }}>
     
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
  
        </Segment>
      </Container>
 )

}

export default Footer
  

