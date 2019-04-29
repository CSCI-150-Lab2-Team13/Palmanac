import React, {Component} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, FlatList, ActivityIndicator} from 'react-native';
import { Icon } from 'react-native-elements'


import { searchPals } from '../firebase/firestoreAPI'
import SearchPalInfo2 from './Pals/SearchedPalInfo2'

import styles from './Pals/styles'

export default class MessageMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      palName: "",
      errorMessage: null,
      loading: false, 
      datafetched : [],
    }
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
                      <Text style={styles.title}>Search Pals</Text>
                  </View>
                  <View style={{ flex: 1 }} />
              </View>
          </SafeAreaView>
          <TextInput
              placeholder="Search"
              onChangeText={(text) => this.search(text)}
              autoFocus={false}
              style={styles.text_input}
              underlineColorAndroid={'transparent'}
              autoCorrect={false}
              ref={component => this.messageInput = component}
          />
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
                        data={this.state.datafetched}
                        keyboardShouldPersistTaps={'handled'}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <SearchPalInfo2
                            navigation={this.props.navigation}
                            contact={item}
                            setErrorMessage={(error) => this.setErrorMessage(error)}
                        />}
                    />}
                </View>
      </View>
    )
  } 
}