import 'react-native';
import React from 'react';
import MainCalendar from '../src/bottomScreens/MainCalendar'

import renderer from 'react-test-renderer';

jest.mock('Platform', () => {
    const Platform = require.requireActual('Platform');
    Platform.OS = 'android';
    return Platform;
  })



it('Assign event test', ()=> {
    
    const navigation = { navigate: jest.fn(),
        addListener: jest.fn()
      };
    let MC = renderer.create(<MainCalendar navigation={navigation}/>).getInstance();
    let testArr = []
    MC.assignEvent(testArr)
    expect(MC.state.events).toEqual(testArr)
})

it('Assign event test2', ()=> {
    const navigation = { navigate: jest.fn(),
                         addListener: jest.fn()
                       };
    let MC = renderer.create(<MainCalendar navigation={navigation}/>).getInstance();
    let testArr = ['1','2','3']
    MC.assignEvent(testArr)
    expect(MC.state.events).toEqual(testArr)
})