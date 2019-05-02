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
    props = event 
    let MC = renderer.create(<MainCalendar {...props}/>).getInstance();
    let testArr = []
    MC.assignEvent(testArr)
    expect(MC.state.events).toEqual(testArr)
})

it('Assign event test2', ()=> {
    props = event
    let MC = renderer.create(<MainCalendar {...props}/>).getInstance();
    let testArr = ['1','2','3']
    MC.assignEvent(testArr)
    expect(MC.state.events).toEqual(testArr)
})