
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
    }
})

export default styles