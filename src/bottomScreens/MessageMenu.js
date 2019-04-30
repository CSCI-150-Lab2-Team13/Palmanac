import React, {Component} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, FlatList, ActivityIndicator} from 'react-native';
import { Icon } from 'react-native-elements'

import firebase from 'react-native-firebase'
import { searchPals } from '../firebase/firestoreAPI'
import firestoreAPI from '../firebase/firestoreAPI'
import SearchPalInfo2 from './Pals/SearchedPalInfo2'
import _ from 'lodash';
import styles from './Pals/styles'


export default class MessageMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      palName: "",
      errorMessage: null,
      loading: false, 
      datafetched : [],
      messagedUserDocs : [],
      emptyTextInput : true,
      username :  firebase.auth().currentUser.displayName
    }

    this.renderSearch = this.renderSearch.bind(this)
  }

  componentDidMount(){
    this.subs = [
        this.props.navigation.addListener("didFocus", () => {
        //  if(!typeof firebase.auth.currentUser === 'undefined') {
            firestoreAPI.getMessagedUsers(this.state.username)
            .then((users) =>{
                var promises = users.map( (userDoc) => {
                        return firestoreAPI.getUser(userDoc['username'])   
                })
                return Promise.all(promises).then((messagedUserDocs) =>{
                    // console.warn(JSON.stringify(results))
                    messagedUserDocs.map((userDoc) =>{
                        _.set(userDoc,'picture',userDoc.photoURL)
                        _.set(userDoc,'name',userDoc.Username)
                    })
                    this.setState({messagedUserDocs})
                
                })
            })
            .catch((err) =>{
                console.error('Could not get Messaged Users', err)
            })
      //  }
    }),
    this.props.navigation.addListener("willBlur", () => this.setState({ isFocused: false }))
  ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }



search = async (input) => {
  this.setState({ contactName: input, errorMessage: null, loading: true })
  searchPals(input)
  .then((results) => this.setState({ datafetched: results, loading: false }))
  .catch((error) => this.setState({ errorMessage: error }))

}


setErrorMessage(error) {
  this.setState({ errorMessage: error })
}

renderSearch(){
    if(!this.state.emptyTextInput){
        return( 
            <View style={{ flex: 1, backgroundColor: 'white' }}>
            {this.state.errorMessage &&
                <Text style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>
                    {this.state.errorMessage}
                </Text>
            }
            {this.state.loading &&
                <ActivityIndicator
                    size={'large'}
                    style={{ flex: 1, justifyContent: 'center' }}
                />
            }
            {this.state.loading == false && <FlatList
                data={this.state.datafetched }
                keyboardShouldPersistTaps={'handled'}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <SearchPalInfo2
                    navigation={this.props.navigation}
                    contact={item}
                    setErrorMessage={(error) => this.setErrorMessage(error)}
                />}
            />}
        </View>
        )
    }
    else{
        return(
            <View style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
            
                data={this.state.messagedUserDocs}
                keyboardShouldPersistTaps={'handled'}
                keyExtractor={(item) => item.UID.toString()}
                renderItem={({ item }) => <SearchPalInfo2
                    navigation={this.props.navigation}
                    contact={item}
                    setErrorMessage={(error) => this.setErrorMessage(error)}
                />}
            />
            </View>
        )
    }
}

render() {
  return (
      <View style={{ flex: 1, backgroundColor: '#63869f' }}>
      {/* {
          <SafeAreaView>
              <View style={styles.header_container}>
                  <TouchableOpacity
                      style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 10 }}
                  >
                      <Icon
                          name='chevron-left'
                          color='white'
                          size={35}
                          style={{ padding: 20, }}
                          underlayColor='transparent'
                      />
                  </TouchableOpacity>
                  <View style={{ justifyContent: 'center', flex: 2, alignItems: 'center' }}>
                     
                      //<Text style={styles.title}>Search Following List</Text>
                     
                  </View>
                  <View style={{ flex: 1 }} />
              </View>
          
          </SafeAreaView> */}
          <TextInput
              placeholder="Search"
              onChangeText={(text) => {
                this.setState({
                    emptyTextInput : (text == "")
                })
                this.search(text)}
            }
              autoFocus={false}
              style={styles.text_input}
              underlineColorAndroid={'transparent'}
              autoCorrect={false}
              ref={component => this.messageInput = component}
          />
          {this.renderSearch()}
      </View>
    )
  } 
}