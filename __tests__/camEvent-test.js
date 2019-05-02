import 'react-native';
import React from 'react';
import CamEvent from '../src/forms/camEvent'

import renderer from 'react-test-renderer';

jest.mock('Platform', () => {
    const Platform = require.requireActual('Platform');
    Platform.OS = 'android';
    return Platform;
  })


//jest.mock('react-native-camera', () =>mockCamera)

//   toggleFocus() {
//     this.setState({
//       autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
//     });
//   }

const navigation = { navigate: jest.fn(),
    addListener: jest.fn()
  };

var CE = renderer.create(<CamEvent navigation={navigation}/>).getInstance();

it('toggle focus test1', ()=> {
    CE.state.autoFocus = 'on'
    CE.toggleFocus()
    expect(CE.state.autoFocus).toEqual('off')
})

it('toggle focus test2', ()=> {
    CE.state.autoFocus = 'off'
    CE.toggleFocus()
    expect(CE.state.autoFocus).toEqual('on')
})


it('toggle wb test1', ()=> {
    CE.state.whiteBalance = 'auto'
    CE.toggleWB()
    expect(CE.state.whiteBalance).toEqual('sunny')
})

it('toggle wb test2', ()=> {
    CE.state.whiteBalance = 'sunny'
    CE.toggleWB()
    expect(CE.state.whiteBalance).toEqual('cloudy')
})

it('toggle wb test3', ()=> {
    CE.state.whiteBalance = 'cloudy'
    CE.toggleWB()
    expect(CE.state.whiteBalance).toEqual('shadow')
})

it('toggle wb test4', ()=> {
    CE.state.whiteBalance = 'shadow'
    CE.toggleWB()
    expect(CE.state.whiteBalance).toEqual('fluorescent')
})

it('toggle wb test5', ()=> {
    CE.state.whiteBalance = 'fluorescent'
    CE.toggleWB()
    expect(CE.state.whiteBalance).toEqual('incandescent')
})

it('toggle wb test6', ()=> {
    CE.state.whiteBalance = 'incandescent'
    CE.toggleWB()
    expect(CE.state.whiteBalance).toEqual('auto')
})

it('toggle wb test6', ()=> {
    CE.state.whiteBalance = 'incandescent'
    CE.toggleWB()
    expect(CE.state.whiteBalance).toEqual('auto')
})

it('toggle FO test1', ()=> {
    CE.state.flash = 'off'
    CE.toggleFlash()
    expect(CE.state.flash).toEqual('on')
})

it('toggle FO test2', ()=> {
    CE.state.flash = 'on'
    CE.toggleFlash()
    expect(CE.state.flash).toEqual('auto')
})

it('toggle FO test3', ()=> {
    CE.state.flash = 'auto'
    CE.toggleFlash()
    expect(CE.state.flash).toEqual('torch')
})

it('toggle FO test4', ()=> {
    CE.state.flash = 'torch'
    CE.toggleFlash()
    expect(CE.state.flash).toEqual('off')
})

it('takePic test1', ()=> {
    CE.state.paused = true
    CE.takePicture().then(() =>{
        expect(CE.state.paused).toEqual(false)
    })
   
})

it('takePic test2', ()=> {
    CE.state.paused = false
    CE.takePicture().then(() =>{
        expect(CE.state.paused).toEqual(true)
    })
})

it('zoomOut test1', ()=> {
    CE.state.zoom = -0.1
    CE.zoomOut()
    expect(CE.state.zoom).toEqual(0)
})

it('zoomOut test2', ()=> {
    CE.state.zoom = 0.1
    CE.zoomOut()
    expect(CE.state.zoom).toEqual(0)
})

it('zoomOut test3', ()=> {
    CE.state.zoom = 1.0
    CE.zoomOut()
    expect(CE.state.zoom).toBeCloseTo(.9)
})

it('zoomOut test4', ()=> {
    CE.state.zoom = 1.1
    CE.zoomOut()
    expect(CE.state.zoom).toBeCloseTo(1.0)
})

it('zoomOut test5', ()=> {
    CE.state.zoom = 0.8
    CE.zoomOut()
    expect(CE.state.zoom).toBeCloseTo(.7)
})

it('zoomOut test6', ()=> {
    CE.state.zoom = 1.3
    CE.zoomOut()
    expect(CE.state.zoom).toBeCloseTo(1.2)
})

it('zoomIn test1', ()=> {
    CE.state.zoom = 0
    CE.zoomIn()
    expect(CE.state.zoom).toBeCloseTo(0.1)
})

it('zoomIn test2', ()=> {
    CE.state.zoom = 0.1
    CE.zoomIn()
    expect(CE.state.zoom).toBeCloseTo(0.2)
})

it('zoomIn test3', ()=> {
    CE.state.zoom = 0.2
    CE.zoomIn()
    expect(CE.state.zoom).toBeCloseTo(0.3)
})

it('zoomIn test4', ()=> {
    CE.state.zoom = 0.3
    CE.zoomIn()
    expect(CE.state.zoom).toBeCloseTo(0.4)
})

it('zoomIn test5', ()=> {
    CE.state.zoom = 0.4
    CE.zoomIn()
    expect(CE.state.zoom).toBeCloseTo(0.5)
})

it('zoomIn test6', ()=> {
    CE.state.zoom = 0.5
    CE.zoomIn()
    expect(CE.state.zoom).toBeCloseTo(0.6)
})







// zoomIn() {
//     this.setState({
//       zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
//     });
//   }

// zoomOut() {
//     this.setState({
//       zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
//     });
//   }
  

// toggleFocus() {
//     this.setState({
//       autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
//     });
//   }





// const flashModeOrder = {
//     off: 'on',
//     on: 'auto',
//     auto: 'torch',
//     torch: 'off',
//   };
  

// const wbOrder = {
//     auto: 'sunny',
//     sunny: 'cloudy',
//     cloudy: 'shadow',
//     shadow: 'fluorescent',
//     fluorescent: 'incandescent',
//     incandescent: 'auto',
//   };

// 
//   toggleWB() {
//     this.setState({
//       whiteBalance: wbOrder[this.state.whiteBalance],
//     });
//   }