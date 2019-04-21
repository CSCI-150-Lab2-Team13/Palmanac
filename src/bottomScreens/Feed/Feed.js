import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, FlatList, ActivityIndicator} from 'react-native';

import { Icon } from 'react-native-elements'

import firebase from 'react-native-firebase'
import { fetchEvents, fetchFriendList } from '../../firebase/firestoreAPI'
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import EventInfo from './EventInfo'
import styles from './styles'
import _ from 'lodash';

export default class Feed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: firebase.auth().currentUser.displayName,
      errorMessage: null,
      loading: false, 
      datafetched : [],
      friendList: []
    }
  }


  async componentDidMount()  {
  fetchFriendList(this.state.user)
  .then((results)=> this.setState({friendList:results}))
  .catch((error)=> this.setState({errorMessage:error}))
}





getEvents()
{

  this.setState({ errorMessage: null, loading: true })
   this.state.friendList.map((item)=>(
     fetchEvents(item.Username.toString())
     .then((results)=> this.setState({datafetched: [...this.state.datafetched, results ]}))
     .catch((error) => this.setState({ errorMessage: error }))
     .finally
     (
        this.setState({loading:false})
     )
        ))
}


setErrorMessage(error) {
  this.setState({ errorMessage: error })
}


  

render() {
  return (

    <View style={{ flex: 1, backgroundColor: '#63869f' }}>
    <SafeAreaView>
        <View style={styles.header_container}>

            <TouchableOpacity
                      style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 10 }}
                      onPress={() => this.getEvents()}
            >
                <FontAwesome
                      name='refresh'
                      color='white'
                      size={35}
                      style={{ padding: 20, }}
                      underlayColor='transparent'
                />
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', flex: 2, alignItems: 'center' }}>
                <Text style={styles.title}> {this.state.user}</Text>
            </View>
            <View style={{ flex: 1 }} />
        </View>
    </SafeAreaView>

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
              { this.state.friendList && this.state.friendList.length > 0 &&
                <Text> hi 32322</Text>
              }

              { this.state.datafetched && this.state.datafetched.length > 0 &&
                <Text> not empty</Text>
              }
              {this.state.loading == false && <FlatList
                        data={this.state.datafetched}
                        keyboardShouldPersistTaps={'handled'}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <EventInfo
                            contact={item}
                            setErrorMessage={(error) => this.setErrorMessage(error)}
                        />}
                />}

          </View>
</View>
  )
}



}

