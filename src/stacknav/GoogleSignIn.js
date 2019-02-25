{/* export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.unsubscriber = null;
        this.state = {
            isAuthenticated: false,
            typedEmail: '',
            typedPassword: '',
            user: null,
        };
    }
    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((changedUser) => {
            // console.log(`changed User : ${JSON.stringify(changedUser.toJSON())}`);
            this.setState({ user: changedUser });
        });
        GoogleSignin.configure({
          androidClientId: '106823834577-oa56hftvr714h6avalhupjon5lps3lcd.apps.googleusercontent.com', // only for android
        })
        .then(() => {
            // you can now call currentUserAsync()
        });
    }
    componentWillUnmount() {
        if (this.unsubscriber) {
            this.unsubscriber();
        }
    }
    onAnonymousLogin = () => {
        firebase.auth().signInAnonymously()
            .then(() => {
                console.log(`Login successfully`);
                this.setState({
                    isAuthenticated: true,
                });
            })
            .catch((error) => {
                console.log(`Login failed. Error = ${error}`);
            });
    }
    onLoginFacebook = () => {
        LoginManager
            .logInWithReadPermissions(['public_profile', 'email'])
            .then((result) => {
                if (result.isCancelled) {
                    return Promise.reject(new Error('The user cancelled the request'));
                }
                console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
                // get the access token
                return AccessToken.getCurrentAccessToken();
            })
            .then(data => {
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                return firebase.auth().signInWithCredential(credential);
            })
            .then((currentUser) => {
                console.log(`Facebook Login with user : ${JSON.stringify(currentUser.toJSON())}`);
            })
            .catch((error) => {
                console.log(`Facebook login fail with error: ${error}`);
            });
    }
    onLoginGoogle = () => {
        GoogleSignin
            .signIn()
            .then((data) => {
                // create a new firebase credential with the token
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
                // login with credential
                return firebase.auth().signInWithCredential(credential);
            })
            .then((currentUser) => {
                console.log(`Google Login with user : ${JSON.stringify(currentUser.toJSON())}`);
            })
            .catch((error) => {
                console.log(`Login fail with error: ${error}`);
            });
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: 'white'
                }}
            >
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    margin: 40
                }}>Login into ScheduleApp </Text>
                <Button title= "Login anonymous"containerStyle={{
                    padding: 10,
                    borderRadius: 4,
                    backgroundColor: 'rgb(226,161,184)'
                }}
                    style={{ fontSize: 18, color: 'white' }}
                    onPress={this.onAnonymousLogin}
                ></Button>
                <Text style={{ margin: 20, fontSize: 15, }}>{this.state.isAuthenticated == true ? 'Logged in anonymous' : ''}</Text>
      

                <Button title= "Login Facebook" containerStyle={{
                    padding: 10,
                    width: 150,
                    margin: 20,
                    borderRadius: 4,
                    backgroundColor: 'rgb(73,104,173)'
                }}
                    style={{ fontSize: 18, color: 'white' }}
                    onPress={this.onLoginFacebook}
                ></Button>
                <Button title= "Login Google"containerStyle={{
                    padding: 10,
                    width: 150,
                    margin: 20,
                    borderRadius: 4,
                    backgroundColor: 'rgb(204,84,65)'
                }}
                    style={{ fontSize: 18, color: 'white' }}
                    onPress={this.onLoginGoogle}
                ></Button>
            </View>
        );
    }
}

*/}