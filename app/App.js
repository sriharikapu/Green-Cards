
import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderStyleInterpolators, HeaderHeightContext } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import './global'

const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

// function LogoTitle() {
//   return (
//     <View style={{
//       height: 300,
//       width: 150,
//       backgroundColor: 'blue'
//     }}>
//       <View style={{
//         height: 50,
//         width: 150
//       }}></View>
//       <Image
//         style={{ width: 150, height: 150 }}
//         source={require('./assets/greenlogo.png')}
//       />
//     </View>
//   );
// }

function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);
  const { width: winWidth, height: winHeight } = Dimensions.get('window');
  return (
    <View style={{ height: 500 }}>
      <View style={{
        top: 10,
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: winWidth,
        backgroundColor: 'white'
      }}>
        <Image
          style={{ width: 150, height: 150 }}
          source={require('./assets/greenlogo.png')}
        />
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{ fontSize: 20, paddingTop: 50, textAlign: 'center' }}
        />
      </View>
      <View style={{ flex: 2 }}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ fontSize: 20, paddingBottom: 50, textAlign: 'center' }}
        />
        <Button title="Sign in" onPress={() => {global.userId = (username == null) ? null : username ; signIn({ username, password })} } />
      </View>
    </View >
  );
}

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"

              component={SignInScreen}
              options={{
                // headerTitle: props => <LogoTitle {...props} />,
                // // When logging out, a pop animation feels intuitive
                // animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                // headerStyle: { height: 200 }
              }}
            />
          ) : (
                // User is signed in
                <Stack.Screen name="Green Reward" component={TabNavigation} />
              )}
        </Stack.Navigator>

      </NavigationContainer>
    </AuthContext.Provider>
  );
}
