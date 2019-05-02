import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Header, Content, Card, CardItem, Body, Left, Thumbnail } from 'native-base';

export default class Notifications extends React.Component {

  render() {

    if(this.props.contact.eventType = 0 ){
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem>
            <Left>
              <Thumbnail source={{uri:this.props.contact.photoURL}} />
              </Left>
              <Body>
                <Text>{this.props.contact.Username} has started to follow you from Searching your Username</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
    }

    else if (this.props.eventType = 1)
    {
      return (
        <Container>
        <Header />
        <Content>
          <Card>
            <CardItem>
            <Left>
              <Thumbnail 
              size={50}
              source={{uri:this.props.contact.photoURL}} />
              </Left>
              <Body>
              <Text>{this.props.contact.Username} has started following you from their Followers List</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>

      )
    }
    else if (this.props.eventType = 2)
    {
      return (
        <Container>
        <Header />
        <Content>
          <Card>
            <CardItem>
            <Left>
              <Thumbnail 
              size={50}
              source={{uri:this.props.contact.photoURL}} />
              </Left>
              <Body>
              <Text>{this.props.contact.Username} has added your event from their feed</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>

      )
    }
    else if (this.props.eventType = 3)
    {
      return (
        <Container>
        <Header />
        <Content>
          <Card>
            <CardItem>
            <Left>
              <Thumbnail 
              size={50}
              source={{uri:this.props.contact.photoURL}} />
              </Left>
              <Body>
              <Text>{this.props.contact.Username} has unfollowed you </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>

      )
    }
  }
}
