import React, { useState } from 'react'
import { StyleSheet, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStateContext } from './context/AppContext'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import CameraScreen from './screens/CameraScreen'

function LogoTitle() {
  return (
    <>
      <Image
        style={{
          width: 35,
          height: 35,
          resizeMode: 'contain'
        }}
        source={require('./assets/brain.png')}
      />
      <Text style={{ 
        margin: 5,
        color: '#3F495A',
        fontWeight: '500',
        fontSize: 20,
        textAlign: 'center',
      }}>
        İnme Merkezi HTS
      </Text>
    </>
  );
}

export default function App() {
  const [userId, setUserId] = useState('')
  const [patientId, setPatientId] = useState('')

  return (
    <AppStateContext.Provider value={{ userId, setUserId, patientId, setPatientId }}>
      <NavigationContainer>
        <Stack.Navigator
        initialRouteName='Login'
        >
          <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
          <Stack.Screen options={{ headerTitle: (props) => <LogoTitle {...props} />, headerStyle: { backgroundColor: '#D9A494' }, headerBackVisible : false }} name='Register' component={RegisterScreen} />
          <Stack.Screen options={{ headerTitle: (props) => <LogoTitle {...props} />, headerStyle: { backgroundColor: '#D9A494' } }} name='Camera' component={CameraScreen} />
          <Stack.Screen options={({ navigation }) => ({
            headerTitle: (props) => <LogoTitle {...props} />,
            headerStyle: { backgroundColor: '#D9A494' },
            headerBackVisible : false,
            headerRight: () => (
              <TouchableOpacity 
              style = {styles.button}
              onPress={() => {
                Alert.alert(
                  "Uyarı",
                  "Çıkmak istediğinize emin misiniz?",
                  [
                    {
                      text: "Hayır",
                      onPress: () => { },
                      style: "cancel",
                    },
                    {
                      text: "Evet",
                      onPress: () => {
                        navigation.push('Login')
                        setPatientId('')
                      }
                    }
                  ],

                );
              }}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                  }}
                  source={require('./assets/exit.png')}
                />
              </TouchableOpacity>
            ),

          })}
            name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppStateContext.Provider>
  );
}

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button : {
    padding : 10
  }
});
