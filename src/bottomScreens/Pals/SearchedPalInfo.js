import React from 'react'
import { Text, TouchableOpacity, Image, Alert, View } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body,Right } from 'native-base';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import firebase from 'react-native-firebase'
import { checkFriendList, followUser, addFollowertoUser } from '../../firebase/firestoreAPI'
import styles from './styles'



export default class SearchPalInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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

   
async componentDidMount() {

        const {currentUser} = await firebase.auth();
        const displayName = currentUser.displayName;
        this.setState({userName: displayName});
        const ref = firebase.firestore().collection('users').doc(this.state.userName);
  
        return ref.get().then(doc => {
          if (doc.exists) {
            let data = doc.data()
            this.setState({firstName : data.firstName, lastName : data.lastName, photoURL:data.photoURL})
          } 
          else {
              console.error("No such user!");
          }
      })
          .catch(function (error) {
              console.error("Error getting user:", error);
          });
  }
  
checkIfContactAlreadyInUserContactListThenAddContact = async () => {

    
    const firstName = this.props.contact.firstName
    const lastName = this.props.contact.lastName
    const photoURL = this.props.contact.picture
    const PalToAdd = this.props.contact.name
    checkFriendList(this.state.userName , PalToAdd)
    .then(results => {
         this.setState({ results: results})
    })
    .catch(error =>{
        this.setState({ errorMessage: error})
    })
    if (!this.state.results.length )
    {

        followUser(this.state.userName, PalToAdd, firstName, lastName,photoURL)
        .then(
            addFollowertoUser(PalToAdd, this.state.userName, this.state.firstName, this.state.lastName, this.state.photoURL)
            .catch((error)=> this.setState({errorMessage:error}))
        )
        .catch((error) =>this.setState({errorMessage:error}))
    }
    else 
    {
        console.log("hi");
    }

}


goToUserProfile = () => {
    console.warn("hello")
    this.props.navigation.navigate('Following');
  }
  




render(){
    return (
    <View> 
    {this.state.errorMessage &&
        <Text style={{ color: 'red', fontStyle: 'italic' }}>
                {this.state.errorMessage}
        </Text>
    }
        <TouchableOpacity onPress={() => this.checkIfContactAlreadyInUserContactListThenAddContact()}>
        {this.state.defaultContainer &&
            <View style={styles.defaultContainer}>
                <Image
                    source={{uri: this.props.contact.picture}}
                    style={styles.rounds}
                />
                    <Text style={styles.text}>
                            {this.props.contact.name}
                    </Text>
                    <View style={styles.defaultContainer}>
                        <Text>
                                {this.props.contact.firstName}
                        </Text>
                        <Text>
                                {this.props.contact.lastName}
                        </Text>
                    </View>
            </View>
        }
        {this.state.confirmationContainer &&
            <View style={styles.confirmationContainer}>
                <Text style={styles.text}>
                    send request
                </Text>
                <Text style={styles.text}>
                    
                </Text>
            </View>
        }

    </TouchableOpacity>
    <View>
    <Container>
        <Header />
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail  source={{uri: this.props.contact.picture}} />
                <Body>
                  <Text>{this.props.contact.name}</Text>
                  <Text note>{this.props.contact.firstName && this.props.contact.lastName}</Text>
                </Body>
              </Left>        
            <Right>    
                <TouchableOpacity
                   // onPress = {() => this.goToUserProfile()}
                >
                    <SimpleLineIcons
                        name = 'user'
                        size = {40}
                    />
                </TouchableOpacity>
                <Body>
                <Text>{this.props.contact.name}</Text>
                </Body>
            </Right>              
            </CardItem>
          </Card>
        </Content>
      </Container>
    </View>
    </View>
    
    )}
}
