import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AppStateContext } from '../context/AppContext';
import { database } from '../firebase'

const CameraScreen = ({ route, navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const { setUserId, setPatientId } = useContext(AppStateContext)

    const { type, text } = route.params;

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleLogin = (data) => {
        setUserId(data)
        database
            .ref('users/' + data)
            .once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    navigation.push('Home')
                } else {
                    Alert.alert("Kayıt Bulunamadı", "Kullanıcı bulunamadı. Lütfen yeni kayıt oluşturunuz.");
                    navigation.push('Register')
                }
            }).catch((error) => {
                console.error(error);
            });
    }

    const handleRegister = (data) => {
        setUserId(data)
        navigation.goBack()
    }

    const patientSave = (data) => {
        setPatientId(data)
        navigation.push('Home')
    }

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        switch (type) {
            case 'OPEN_CAMERA':
                return (navigation.goBack())
            case 'USER_REGISTER':
                return(handleRegister(data))
            case 'USER_LOGIN':
                return(handleLogin(data))
            case 'PATIENT_SAVE':
                return(patientSave(data))
            default:
                return (navigation.goBack())
        }

    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    return (
        <View style={styles.container}>
            <Text style  ={styles.text}>
                { text ? text : 'Barkodu okutunuz.'}
            </Text>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.camera}
            />
        </View>
    )
}

export default CameraScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#3F495A'
    },
    text : {
        fontSize : 24,
        marginBottom : 40,
        textAlign : 'center',
        color: 'white'
    },
    camera : {
        width : '100%',
        height : 300
    }
})