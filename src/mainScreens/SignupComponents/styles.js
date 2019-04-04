import { StyleSheet , Dimensions} from 'react-native'
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 50,
        textShadowOffset: { width: 4, height: 4 }
    },
    SignUpButton: {
        borderRadius: 75,
        paddingLeft: 100,
        paddingRight: 100,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 20,
        elevation: 4,
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    Text1: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    Text2: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 75,
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 20,
        paddingBottom: 0,
        elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    profile_item: {
        paddingBottom: 15,
        marginLeft: 15,
        marginRight: 15,
        
    },
    button_text: {
        color: 'black',
        marginLeft: 10,
    },
    avatar_container: {
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar_image: {
        width: 200,
        height: 200,
        borderRadius: 30,
    },

})

export default styles 