
import { StyleSheet, Dimensions } from 'react-native'


const { height, width } = Dimensions.get('window')
const itemHeight = height / 10;
const itemWidth = (width / 3.5) - 10;
const roundWidth = itemWidth / 2;


const styles = StyleSheet.create({
    header_container: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
    },
    header_subcontainer: {
        justifyContent: 'center', 
        alignItems: 'flex-start',
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    header_container: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
    },

    text_input: {
        paddingLeft: 5,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        minHeight: 40
    },
    empty_list: {
        textAlign: 'center',
        color: 'grey',
        fontSize: 20,
        paddingTop: 80
    },

    defaultContainer: {
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        alignItems: 'center',
        minHeight: itemHeight,
        flexDirection: 'row',
        paddingLeft: 15
    },
    rounds: {
        width: roundWidth,
        height: roundWidth,
        borderRadius: roundWidth / 2,
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
        paddingLeft: 15
    },
    confirmationContainer: {
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        alignItems: 'center',
        minHeight: itemHeight,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#EEE3E3'
    },
    RequestSend: {
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: itemHeight,
        paddingTop: 10,
        paddingBottom: 10,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
      },
      modalContent: {
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
      },
      header:{
        backgroundColor: "#000FFF",
        height:200,
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
      },
      name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
      },
      body:{
        marginTop:40,
      },
      bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
      },
      name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
      },
      info:{
        fontSize:16,
        color: "#00BFFF",
        marginTop:10
      },
      description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
      },
      buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00BFFF",
      },
})

export default styles