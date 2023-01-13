import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

const LoginScreen = ({ navigation }) => {

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <Image source={require('../assets/brain.png')} style={styles.img} />
            <View style={styles.brand}>
                <Text style={styles.brandText}>KARTAL DR. LÜTFİ KIRDAR ŞEHİR HASTANESİ</Text>
                <Text style={styles.appNameText}>İNME MERKEZİ</Text>
                <Text style={styles.appNameText}>HASTA TAKİP SİSTEMİ</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.push('Camera', {type:'USER_LOGIN', text : 'Uygulamaya giriş için \nKimlik barkodunuzu okutunuz.'})}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Giriş Yap</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9C4B4'
    },
    img: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    brand: {
        margin: 20
    },
    brandText: {
        color: '#5F697A',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
        marginBottom : 5
    },
    appNameText: {
        color: '#3F495A',
        fontWeight: '900',
        fontSize: 32,
        textAlign: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },

    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#5F697A',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 24,
    },

})