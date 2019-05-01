import React, {Component} from 'react';
import { Container, Header, Content, Item, Input, Title } from 'native-base';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, FlatList, ActivityIndicator} from 'react-native';
//import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';



import { searchPals } from '../../firebase/firestoreAPI'
import SearchPalInfo from '../Pals/SearchedPalInfo'

import styles from '../Pals/styles'

export default class Pals extends Component {

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
      <View style = {{flex: 1, backgroundColor: 'green'}}>
      <Container style={{flex: 1}}>
          <SafeAreaView> 
              <Header style = {{backgroundColor: 'black'}}>
                  <TouchableOpacity
                      style={{ paddingLeft: 0 }}
                  >
                      <Icon
                          name='user-circle'
                          color='white'
                          size={35}
                          style={{ padding: 10 }}
                          underlayColor='transparent'
                      />
                  </TouchableOpacity>
                  <View style={{ justifyContent: 'center', flex: 3, alignItems: 'center', paddingRight: 45 }}>
                      <Title>Pal Search</Title>
                  </View>
              </Header>


              <View style={{ flex: 1, marginBottom: 10, alignContent: "center", backgroundColor: 'blue'}} />
          </SafeAreaView>
          <Item rounded>
          <TextInput
              placeholder="  Find your pal"
              onChangeText={(text) => this.search(text)}
              autoFocus={false}
             // underlineColorAndroid={'transparent'}
              autoCorrect={false}
              ref={component => this.messageInput = component}
          />
          </Item>
                <View style={{ flex: 2, backgroundColor: 'blue' }}>
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
                        renderItem={({ item }) => <SearchPalInfo
                            contact={item}
                            setErrorMessage={(error) => this.setErrorMessage(error)}
                        />}
                    />}
                </View>
      </Container>
      </View>
    )
  } 
}