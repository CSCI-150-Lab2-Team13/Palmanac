import React, { Component } from 'react'
import {  View, StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Container,Icon, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base'
import firebase from 'react-native-firebase'

import {getUser} from "../firebase/firestoreAPI"


import EntypoIcon from 'react-native-vector-icons/Entypo';

let userID = '';

  class Profile extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="person" style={{ color: tintColor }} />
            
        )
    };
    

  

    constructor(props) {
        super(props);
        this.state = {
          currentUser: null,
          userName: '',
          firstName: '',
          lastName: '',
          photoURL: '',

        };
  
    // this.handleUploadImage = this.handleUploadImage.bind(this);
    }
    


     async componentDidMount() {

      const {currentUser} = await firebase.auth();
      userID = currentUser.uid;
      this.setState({currentUser});
      const userId = this.state.currentUser.uid;  
      const ref = firebase.firestore().collection('users').doc(userId);

      return ref.get().then(doc => {
        if (doc.exists) {
          let data = doc.data()
          this.setState({firstName : data.firstName, lastName : data.lastName, userName:data.userName, photoURL:data.photoURL})
        } 
        else {
            console.error("No such user!");
        }
    })
        .catch(function (error) {
            console.error("Error getting user:", error);
        });
}

/*
    handleUploadImage(event) {
        event.preventDefault();
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('filename', event.target.files[0]);
        const filename = event.target.files[0].name;
        storage().ref('/images/').child(filename).put(event.target.files[0]).then((snapshot) =>{
       
            this.setState({ image: snapshot.downloadURL});
            this.state.ref.doc(firebase.auth().currentUser.uid).update(
                {photoURL: snapshot.downloadURL}
            );
            });   
    
} */
render() {

  const { first, last, image , userName} = this.state
  return (
    <Container>
              <Header  style={{ paddingLeft: 10, paddingLeft: 10 }}>
                    <Left>
                        <Icon name="md-person-add" />
                    </Left>
                    <Right>
                        <EntypoIcon name="back-in-time" style={{ fontSize: 32 }} />
                    </Right>
                </Header>
      <Content>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'Image URL'}} />
              <Body>
                <Text>{this.state.userName}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
          
            <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>
          </CardItem>

        </Card>
      </Content>
    </Container>
  );
}
}

export default Profile;

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'gray',
  alignItems: 'center',
  justifyContent: 'center'
}
});

