/* eslint-disable no-console */
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';


const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

const landmarkSize = 2;

export default class CamEvent extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    recordOptions: {
      mute: false,
      maxDuration: 5,
      quality: RNCamera.Constants.VideoQuality['288p'],
    },
    isRecording: false,
    canDetectText: false,
    textBlocks: [],
    paused: false
  };


  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  submitPicture = function(){
      if(this.state.textBlocks){
        var largestText = ""
        var largestSize = 0
        var allText = ""
        this.state.textBlocks.map(
            ({ bounds, value }) => {
                if((bounds.size.width * bounds.size.height) > largestSize){
                    largestText = value
                    largestSize = bounds.size.width * bounds.size.height
                }
                allText += " " 
                allText += value
            }
        )
        const getDiff = (string, diffBy) => string.split(diffBy).join('')
        var eventStr = getDiff(allText, largestText)
        if(eventStr == ""){
            eventStr = largestText
            largestText = ""
        }
        this.props.navigation.navigate({ routeName: 'HardEvent', params: {eventString: eventStr, title: largestText }})
        

        
      }
   
  }

  takePicture = async function() {
    if (this.camera && !this.state.paused) {
      const data = await this.camera.takePictureAsync(
          {
              doNotSave: true,
              pauseAfterCapture: true
          }
      );
      this.setState({
          paused: true
      })
    //  console.warn('takePicture ', data);

    }
    else if(this.state.paused){
        this.camera.resumePreview()
        this.setState({
            paused: false
        })
    }
  };

  toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));



  renderTextBlocks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.textBlocks.map(this.renderTextBlock)}
    </View>
  );

  renderTextBlock = ({ bounds, value }) => (
    <React.Fragment key={value + bounds.origin.x}>
      <Text style={[styles.textBlock, { left: bounds.origin.x, top: bounds.origin.y }]}>
        {value}
      </Text>
      <View
        style={[
          styles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      />
    </React.Fragment>
  );

  textRecognized = object => {
    const { textBlocks } = object;
    this.setState({ textBlocks });
  };

  renderCamera() {
    const { canDetectText } = this.state;
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        trackingEnabled
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera'}

        onTextRecognized={canDetectText ? this.textRecognized : null}
      >
        <View
          style={{
            flex: 0.5,
          }}
        >
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
              <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flipButton} onPress={this.toggleWB.bind(this)}>
              <Text style={styles.flipText}> WB: {this.state.whiteBalance} </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity onPress={this.toggle('canDetectText')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectText ? 'Detect Text' : 'Detecting Text'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 0.4,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          <Slider
            style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
            onValueChange={this.setFocusDepth.bind(this)}
            step={0.1}
            disabled={this.state.autoFocus === 'on'}
          />
        </View>
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >

        </View>
        {this.state.zoom !== 0 && (
          <Text style={[styles.flipText, styles.zoomText]}>Zoom: {this.state.zoom}</Text>
        )}
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomIn.bind(this)}
          >
            <Text style={styles.flipText}> + </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomOut.bind(this)}
          >
            <Text style={styles.flipText}> - </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleFocus.bind(this)}
          >
            <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.takePicture.bind(this)}
          >
            <Text style={styles.flipText}>  {!this.state.paused ? 'Take Picture' : 'Take Another'} </Text>
        </TouchableOpacity>

            {this.state.paused == true && (
                <TouchableOpacity
                style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
                onPress={this.submitPicture.bind(this)}
                >
               <Text style={styles.flipText}>Submit</Text>
               </TouchableOpacity>
            )}

        </View>

        {!!canDetectText && this.renderTextBlocks()}
      </RNCamera>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});