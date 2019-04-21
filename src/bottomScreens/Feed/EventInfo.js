import React from 'react'
import { Text, TouchableOpacity, Image, Alert, View } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail,  Button, Icon, Left, Body } from 'native-base';


import firebase from 'react-native-firebase'
import { checkfollowList, followUser, addFollowertoUser } from '../../firebase/firestoreAPI'
import styles from './styles'



export default class SearchPalInfo extends React.Component {
  constructor(props) {
    super(props)
    this.picture = require('../../img/palmanacLogo.png'),
    this.state = {
        sendRequest: false,
        defaultContainer: true,
        confirmationContainer: false,
        results: [],
        errorMessage: null, 
        userName: '',
        firstName:'',
        lastName:'',
        photoURL:'',

    }
}
   





    render(){
      return (
      <View> 
      {this.state.errorMessage &&
          <Text style={{ color: 'red', fontStyle: 'italic' }}>
                  {this.state.errorMessage}
          </Text>
      }
   <Container>
        <Header />
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'Image URL'}} />
                <Body>
                  <Text>{this.props.contact.title}</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                  //Your text here
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
      </View>
      )}
}