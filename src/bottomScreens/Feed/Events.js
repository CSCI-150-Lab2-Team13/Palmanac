import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title , Card, CardItem, Thumbnail} from 'native-base';




import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import styles from './styles'



export default class Events extends React.Component {
   
    constructor(props) {
        super(props)
        this.state = {
            onlyOneLike: false,
            likes: null,
            }
          }


    
  render() {

    return (
        <View  >
        <Card style={styles.EventsCard}>
          <CardItem >
          <Left>
              <Thumbnail source={{uri:this.props.contact.photoURL}} />
          </Left>
            <Text style={{fontWeight: 'bold'}}>{this.props.contact.username}</Text>
          </CardItem>
          <CardItem >
            <Text>Event By: </Text><Text style={{fontStyle: 'italic'}}>{this.props.contact.username}</Text>
          </CardItem>
          <CardItem>
          <Text>{this.props.contact.desc ? this.props.contact.desc :"No description provided" }</Text> 
          </CardItem>
          <CardItem>

          </CardItem>
          <CardItem>
           {!this.state.onlyOneLike &&
                    <Left>
                    <Button transparent
                    onPress={() => this.sendLiketoFireStore()}
                    >
                      <Icon active name="thumbs-up" />
                      <Text>{this.props.contact.likes}</Text>
                    </Button>
                  </Left>
          }
          {this.state.onlyOneLike && 
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                  <Text>{this.props.contact.likes}</Text>
              </Button>
          </Left>

          }
          <Body>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text> 0 comments</Text>
            </Button>
          </Body>
          <Right>
            <Button transparent>
              <FontAwesome active name="address-card" 
                size = {30}
              />
            </Button>
          </Right>
        </CardItem>
        </Card>
      </View>
    )
  }
}

