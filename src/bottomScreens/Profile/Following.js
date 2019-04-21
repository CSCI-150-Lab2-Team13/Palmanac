import React, { Component } from 'react'
import { Text, View , SafeAreaView, TouchableOpacity, FlatList} from 'react-native'
import { Icon } from 'react-native-elements'

import firebase from 'react-native-firebase'
import { fetchFollowing } from '../../firebase/firestoreAPI'


import Userinfo from './Userinfo'
import styles from './styles'
export class Following extends Component {

constructor(props) {
    super(props)
    this.state = {
        user: firebase.auth().currentUser.displayName,
        errorMessage: null,
        loading: false, 
        friendList: []
        }
      }
      

async componentDidMount()  {
    fetchFollowing(this.state.user)
    .then((results)=> this.setState({friendList:results}))
    .catch((error)=> this.setState({errorMessage:error}))
      
}



  render() {
    return (
        <View style={{ flex: 1, backgroundColor: '#63869f' }}>
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
                    <Text style={styles.title}>Users you Follow</Text>
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
              { this.state.friendList && this.state.friendList.length == 0 &&
                <Text> hi 32322</Text>
              }

                  {this.state.loading == false && <FlatList
                      data={this.state.friendList}
                      keyboardShouldPersistTaps={'handled'}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) =>  <Userinfo
                          contact={item}
                          setErrorMessage={(error) => this.setErrorMessage(error)}
                      />}
                  />}
              </View>
    </View>
    )
  }
}

export default Following
