import React, { Component } from 'react'
import {  View, StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Container,Icon, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base'
import { firestore,storage } from 'firebase';
import firebase from '@firebase/app'


import EntypoIcon from 'react-native-vector-icons/Entypo';

  class Profile extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="person" style={{ color: tintColor }} />
            
        )
    };

    static propTypes = {
        currentUser: PropTypes.object,
        match: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            ref: firestore().collection("users"),
            first:"",
            last:"",
            image:"",
            location:"",
            userName:""

        };

     this.handleUploadImage = this.handleUploadImage.bind(this);
    }


    getUser(userId) {
        const { currentUser } = this.props;
        const { ref } = this.state;

        if (!currentUser ) return;
        ref 
            .doc(userId?userId: currentUser.id)
            .get()
            .then(info => {
                const firstName = info.data().firstName;
                const lastName = info.data().lastName;
                const image = info.data().photoURL;
                const location = info.data().location;
                const userName = info.data().userName;
                this.setState ({ first:firstName , last : lastName, image:image, location:location, userName:userName}) 
                 });
    }

    componentDidMount() {
        this.getUser(firebase.auth().currentUser.uid);

    }

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
        
}
render() {

  const { first, last, image , location, userName} = this.state
  return (
    <Container>
              <Header style={{ paddingLeft: 10, paddingLeft: 10 }}>
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
                <Text>NativeBase</Text>
                <Text note>GeekyAnts</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>12 Likes</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>4 Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>11h ago</Text>
            </Right>
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

